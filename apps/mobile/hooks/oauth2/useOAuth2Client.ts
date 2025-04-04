import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { ID_TOKEN, REFRESH_TOKEN, useGatewayClient } from "common";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { openBrowserAsync } from "expo-web-browser";
import { useEffect } from "react";

export type OAuth2Client = {
  clientId: string;
  clientSecret: string;
  authUrl: string;
  tokenUrl: string;
  logoutUrl: string;
  grantType: "authorization_code";
  redirectUri: string;
  scope: string;
};

export type OAuth2ClientState = {
  client: OAuth2Client;
  login: () => void;
  logout: () => void;
};

export type OAuth2TokenResponseBody = {
  access_token: string;
  refresh_token: string;
  scope: string;
  id_token: string;
  token_type: string;
  expires_in: number;
};

export function useOAuth2Client(): OAuth2ClientState {
  const { client: gatewayClient } = useGatewayClient();
  const queryClient = useQueryClient();
  const client: OAuth2Client = {
    clientId: process.env.EXPO_PUBLIC_CLIENT_ID!,
    clientSecret: process.env.EXPO_PUBLIC_CLIENT_SECRET!,
    authUrl: process.env.EXPO_PUBLIC_AUTH_URL!,
    tokenUrl: process.env.EXPO_PUBLIC_TOKEN_URL!,
    logoutUrl: process.env.EXPO_PUBLIC_LOGOUT_URL!,
    grantType: "authorization_code",
    redirectUri: makeRedirectUri({ scheme: "coachcore" }),
    scope: "openid",
  };

  const [_response, result, promptAsync] = useAuthRequest(
    {
      clientId: client.clientId,
      redirectUri: client.redirectUri,
      scopes: [client.scope],
      responseType: "code",
      usePKCE: false,
    },
    {
      authorizationEndpoint: client.authUrl,
    }
  );

  useEffect(() => {
    if (!result || result.type !== "success") {
      return;
    }
    const fetchToken = async () => {
      const code = result.params.code;
      const secret = btoa(`${client.clientId}:${client.clientSecret}`);
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Basic ${secret}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const body = new URLSearchParams({
        grant_type: client.grantType,
        code,
        redirect_uri: client.redirectUri,
      });

      const response = await axios.post(client.tokenUrl, body, config);
      const tokens: OAuth2TokenResponseBody = response.data;
      console.log("tokens: " + JSON.stringify(tokens));
      gatewayClient.defaults.headers.common["Authorization"] =
        `Bearer ${tokens.access_token}`;
      await AsyncStorage.setItem(REFRESH_TOKEN, tokens.refresh_token);
      await AsyncStorage.setItem(ID_TOKEN, tokens.id_token);
      queryClient.clear();
    };
    fetchToken();
  }, [result]);

  return {
    client,
    login: async () => {
      await promptAsync();
    },
    logout: async () => {
      console.log("Openning logout url: " + client.logoutUrl);
      await openBrowserAsync(client.logoutUrl);
      await AsyncStorage.removeItem(REFRESH_TOKEN);
      await AsyncStorage.removeItem(ID_TOKEN);
      queryClient.clear();
    },
  };
}
