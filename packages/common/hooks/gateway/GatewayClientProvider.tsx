import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import React, { ReactNode, useEffect, useState } from "react";
import { GatewayClientContext } from "./GatewayClientContext";

export type GatewayClient = {
  client: AxiosInstance;
  refreshToken: string | null;
  accessToken: string | null;
  idToken: string | null;
};

export type TokenStorage = {
  persistRefreshToken: (token: string) => void;
  restoreRefreshToken: () => Promise<string | null>;
  persistIdToken: (token: string) => void;
  restoreIdToken: () => Promise<string | null>;
};

export type Urls = {
  token: string;
  gateway: string;
};

export type OAuth2ClientCredentials = {
  id: string;
  secret: string;
};

export type GatewayClientProviderProps = {
  children: ReactNode;
  tokenStorage: TokenStorage;
  urls: Urls;
  oauth2Client: OAuth2ClientCredentials;
};

export function GatewayClientProvider({
  children,
  tokenStorage,
  urls,
  oauth2Client,
}: GatewayClientProviderProps) {
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);

  const client = axios.create({
    baseURL: urls.gateway,
    headers: {
      "Content-Type": "application/json",
    },
  });

  client.interceptors.request.use((request) => {
    request.headers.Authorization = `Bearer ${accessToken}`;
    return request;
  });

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (!error.response) {
        return Promise.reject(error);
      }

      const status = error.response.status;

      if (status === 401 || status === 403) {
        const body = {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        };
        const config: AxiosRequestConfig = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(`${oauth2Client.id}:${oauth2Client.secret}`)}`,
          },
        };

        const response = await axios.post(urls.token, body, config); // tries to refresh token
        const data = response.data;
        const newIdToken = data.id_token;
        const newAccessToken = data.access_token;

        setAccessToken(newAccessToken);
        setIdToken(newIdToken);

        tokenStorage.persistRefreshToken(data.refresh_token);
        tokenStorage.persistIdToken(data.id_token);

        if (response.status === 200) {
          axios(error.config);
        }
      }
    }
  );

  useEffect(() => {
    const restore = async () => {
      setRefreshToken(await tokenStorage.restoreRefreshToken());
      setIdToken(await tokenStorage.restoreIdToken());
    };
    restore();
  }, [tokenStorage]);

  return (
    <GatewayClientContext.Provider
      value={{ client, refreshToken, accessToken, idToken }}
    >
      {children}
    </GatewayClientContext.Provider>
  );
}
