import { tokenStorage } from "@/app/_layout";
import { useQueryClient } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { LOG, useGatewayClient } from "common";
import * as AuthSession from "expo-auth-session";
import { openBrowserAsync } from "expo-web-browser";
import { useEffect } from "react";

const CLIENT_ID = process.env.EXPO_PUBLIC_CLIENT_ID!;
const CLIENT_SECRET = process.env.EXPO_PUBLIC_CLIENT_SECRET!;
const AUTH_URL = process.env.EXPO_PUBLIC_AUTH_URL!;
const REDIRECT_URI = AuthSession.makeRedirectUri({ scheme: "coachcore" });
const CLIENT_CREDENTIALS = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
const TOKEN_URL = process.env.EXPO_PUBLIC_TOKEN_URL!;
const LOGOUT_URL = process.env.EXPO_PUBLIC_LOGOUT_URL!;

export type OAuth2ClientState = {
  login: () => void;
  logout: () => void;
};

/**
 * Custom hook for managing OAuth2 authentication flow, including login, logout,
 * and token handling. It uses the `expo-auth-session` library to handle the OAuth2
 * flow and stores the resulting tokens in a global context for access throughout
 * the application.
 *
 * ### Responsibilities:
 * - Perform OAuth2 login using the authorization code grant flow.
 * - Fetch access, refresh, and ID tokens from the authorization server.
 * - Handle user logout and clear tokens from the client and storage.
 * - Invalidate and reset the react-query cache upon login and logout.
 *
 * It provides the following functionality:
 * - `login` - Initiates the OAuth2 login flow, redirects to the authorization server.
 * - `logout` - Clears user tokens and session, invalidates react-query cache,
 *   and logs the user out of the authorization server.
 *
 * **Usage:**
 * This hook should be used in a component where you need to trigger the login or
 * logout actions. This hook must be wrapped with `GatewayClientProvider`
 *
 * @returns {OAuth2ClientState} - The OAuth2 client state, including `login` and `logout` functions.
 *
 * @example
 * const { login, logout } = useOAuth2Client();
 *
 * // To initiate login:
 * await login();
 *
 * // To logout:
 * await logout();
 */
export function useOAuth2Client(): OAuth2ClientState {
  const { setAccessToken, setRefreshToken, setIdToken } = useGatewayClient();
  const client = useQueryClient();

  const [_response, result, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      redirectUri: REDIRECT_URI,
      scopes: ["openid"],
      responseType: "code",
      usePKCE: false,
    },
    {
      authorizationEndpoint: AUTH_URL,
    }
  );

  useEffect(() => {
    if (!result || result.type !== "success") {
      return;
    }
    const fetchToken = async () => {
      const code = result.params.code;
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Basic ${CLIENT_CREDENTIALS}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      });
      const response = await axios.post(TOKEN_URL, body, config);
      const data = response.data;

      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
      setIdToken(data.id_token);
    };
    fetchToken();
  }, [result]);

  return {
    login: async () => {
      LOG.debug("Logging in");
      client.invalidateQueries();
      client.removeQueries();
      client.resetQueries();
      client.clear();

      await promptAsync();
    },
    logout: async () => {
      LOG.debug("Logging out");
      await tokenStorage.clearRefreshToken();
      await tokenStorage.clearIdToken();

      setAccessToken(null);
      setRefreshToken(null);
      setIdToken(null);

      client.invalidateQueries();
      client.removeQueries();
      client.resetQueries();
      client.clear();

      await openBrowserAsync(LOGOUT_URL);
    },
  };
}
