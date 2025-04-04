import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import React, { ReactNode } from "react";
import { useAuth } from "../auth";
import { GatewayClientContext } from "./GatewayClientContext";

export type GatewayClient = {
  client: AxiosInstance;
};

export type GatewayClientProviderProps = {
  children: ReactNode;
  getRefreshToken: () => Promise<string | null>;
  saveRefreshToken: (token: string) => void;
  tokenUrl: string;
  gatewayUrl: string;
  clientId: string;
  clientSecret: string;
};

export function GatewayClientProvider({
  children,
  getRefreshToken,
  saveRefreshToken,
  tokenUrl,
  gatewayUrl,
  clientId,
  clientSecret,
}: GatewayClientProviderProps) {
  const { setIdToken } = useAuth();
  const createInstance = () => {
    const instance = axios.create({
      baseURL: gatewayUrl,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (!error.response) {
          return Promise.reject(error);
        }
        const status = error.response.status;
        if (status === 401 || status === 403) {
          const body = {
            grant_type: "refresh_token",
            refresh_token: await getRefreshToken(),
          };
          const config: AxiosRequestConfig = {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            },
          };
          const response = await axios.post(tokenUrl, body, config);
          const data = response.data;
          instance.defaults.headers.common["Authorization"] =
            `Bearer ${data.access_token}`;
          saveRefreshToken(data.refresh_token);
          setIdToken(data.id_token);
          if (response.status === 200) {
            axios(error.config);
          }
        }
      }
    );

    return instance;
  };
  return (
    <GatewayClientContext.Provider value={{ client: createInstance() }}>
      {children}
    </GatewayClientContext.Provider>
  );
}
