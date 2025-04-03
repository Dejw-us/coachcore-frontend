import axios, { AxiosRequestConfig } from "axios";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useEffect } from "react";

export type OAuth2Client = {
  clientId: string;
  clientSecret: string;
  authUrl: string;
  tokenUrl: string;
  grantType: "authorization_code";
  redirectUri: string;
  scope: string;
};

export type AuthorizeParams = {
  response_type: "code";
  client_id: string;
  state: string;
  scope: string;
  redirect_uri: string;
};

export type OAuth2ClientState = {
  client: OAuth2Client;
  fetchToken: () => void;
};

export function useOAuth2Client(): OAuth2ClientState {
  const client: OAuth2Client = {
    clientId: process.env.EXPO_PUBLIC_CLIENT_ID!,
    clientSecret: process.env.EXPO_PUBLIC_CLIENT_SECRET!,
    authUrl: process.env.EXPO_PUBLIC_AUTH_URL!,
    tokenUrl: process.env.EXPO_PUBLIC_TOKEN_URL!,
    grantType: "authorization_code",
    redirectUri: makeRedirectUri({ scheme: "coachcore" }),
    scope: "openid",
  };

  const [request, result, promptAsync] = useAuthRequest(
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
    console.log("result: " + JSON.stringify(result));

    const fetchToken = async () => {
      const code = result.params.code;
      console.log("Fetching for code: " + code);
      const secret = btoa(`${client.clientId}:${client.clientSecret}`);
      console.log("Btoa: " + secret);
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
      console.log("fetching token from " + client.tokenUrl);

      const response = await axios.post(client.tokenUrl, body, config);
      console.log("response");
      console.log(JSON.stringify(response));
    };
    fetchToken();
  }, [result]);

  const authorize = async () => {
    await promptAsync();
  };

  return {
    client,
    fetchToken: async () => {
      console.log("fetching code bla");
      await authorize();
      console.log("fetching token");
    },
  };
}
