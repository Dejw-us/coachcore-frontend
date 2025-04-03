import axios, { AxiosInstance } from "axios";
import React, { ReactNode } from "react";
import { GatewayClientContext } from "./GatewayClientContext";

export type GatewayClient = {
  instance: AxiosInstance;
};

export type GatewayClientProviderProps = {
  children: ReactNode;
};

export function GatewayClientProvider({
  children,
}: GatewayClientProviderProps) {
  const createInstance = () => {
    return axios.create();
  };
  return (
    <GatewayClientContext.Provider value={{ instance: createInstance() }}>
      {children}
    </GatewayClientContext.Provider>
  );
}
