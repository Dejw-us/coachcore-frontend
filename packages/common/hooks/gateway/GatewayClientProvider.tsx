import axios, { AxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  GatewayClientProviderProps,
  Tokens,
  User,
} from "./GatewayClient.types";
import { GatewayClientContext } from "./GatewayClientContext";

const GatewayClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_GATEWAY_URL!,
  headers: {
    "Content-Type": "application/json",
  },
});

async function fetchTokens(
  tokenUrl: string,
  refreshToken: string,
  clientId: string,
  clientSecret: string
): Promise<Tokens | null> {
  const body = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };
  const clientCredentials = btoa(`${clientId}:${clientSecret}`);

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${clientCredentials}`,
    },
  };
  const response = await axios.post(tokenUrl, body, config);
  if (response.status === 200) {
    return response.data;
  }

  return null;
}

export function GatewayClientProvider({
  children,
  tokenStorage,
  urls,
  oauth2Client,
}: GatewayClientProviderProps) {
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const restore = async () => {
      const newRefreshToken = await tokenStorage.restoreRefreshToken();
      const newIdToken = await tokenStorage.restoreIdToken();

      setRefreshToken(newRefreshToken);
      setIdToken(newIdToken);
    };
    restore();
  }, [tokenStorage]);

  useEffect(() => {
    if (refreshToken) {
      tokenStorage.persistRefreshToken(refreshToken);
    }
  }, [refreshToken]);

  useEffect(() => {
    if (idToken) {
      tokenStorage.persistIdToken(idToken);
    }
  }, [idToken]);

  useEffect(() => {
    if (!refreshToken) {
      return;
    }

    const requestInterceptor = GatewayClient.interceptors.request.use(
      (request) => {
        if (accessToken != null) {
          request.headers.Authorization = `Bearer ${accessToken}`;
        }
        return request;
      }
    );

    const responseInerceptor = GatewayClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (!error.response) {
          return Promise.reject(error);
        }

        const status = error.response.status;
        if ((status === 401 || status === 403) && refreshToken != null) {
          const tokens = await fetchTokens(
            urls.token,
            refreshToken,
            oauth2Client.id,
            oauth2Client.secret
          );

          if (tokens) {
            const newIdToken = tokens.id_token;
            const newAccessToken = tokens.access_token;

            setAccessToken(newAccessToken);
            setIdToken(newIdToken);

            tokenStorage.persistRefreshToken(tokens.refresh_token);
            tokenStorage.persistIdToken(newIdToken);
            return axios(error.config);
          }
        }
      }
    );

    return () => {
      GatewayClient.interceptors.request.eject(requestInterceptor);
      GatewayClient.interceptors.request.eject(responseInerceptor);
    };
  }, [accessToken, refreshToken, setAccessToken, setIdToken]);

  useEffect(() => {
    if (idToken != null) {
      const jwt = jwtDecode(idToken);
      const user: User = {
        username: jwt.sub!,
      };
      setUser(user);
    } else {
      setUser(null);
    }
  }, [idToken]);

  return (
    <GatewayClientContext.Provider
      value={{
        client: GatewayClient,
        refreshToken,
        accessToken,
        idToken,
        user,
        setAccessToken,
        setIdToken,
        setRefreshToken,
      }}
    >
      {children}
    </GatewayClientContext.Provider>
  );
}
