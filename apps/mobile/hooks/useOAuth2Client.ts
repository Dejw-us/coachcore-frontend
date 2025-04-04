import axios, { AxiosRequestConfig } from "axios";
import { useGatewayClient } from "common";
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

export function useOAuth2Client(): OAuth2ClientState {
  const { setAccessToken, setRefreshToken, setIdToken } = useGatewayClient();

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
      console.log("data: " + JSON.stringify(data));
    };
    fetchToken();
  }, [result]);

  return {
    login: async () => await promptAsync(),
    logout: async () => {
      setAccessToken(null);
      setRefreshToken(null);
      setIdToken(null);
      await openBrowserAsync(LOGOUT_URL);
    },
  };
}
