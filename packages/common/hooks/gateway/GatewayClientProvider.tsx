import axios from "axios";
import React, { useRef, useState } from "react";
import { GatewayClientProviderProps, User } from "./GatewayClient.types";
import { GatewayClientContext } from "./GatewayClientContext";
import { useFetchTokens } from "./useFetchTokens";
import { useRestoreTokens } from "./useRestoreTokens";
import { useTokensSetters } from "./useTokensSetters";
import { useUpdateGatewayClient } from "./useUpdateGatewayClient";

const GatewayClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_GATEWAY_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * GatewayClientProvider is a context provider that sets up and manages
 * OAuth2 token-based authentication flow with automatic token restoration,
 * refreshing, and Axios request/response handling.
 *
 * It provides access to:
 * - `GatewayClient` — a preconfigured Axios instance with auth headers
 * - current tokens: `accessToken`, `refreshToken`, `idToken`
 * - decoded user information
 * - functions to manually update tokens
 *
 * This component should wrap your application to provide authentication context.
 *
 * ### Responsibilities:
 * - Restore tokens from secure storage on mount
 * - Attach tokens to Axios requests
 * - Automatically refresh tokens on 401/403 responses
 * - Decode and store user info from `idToken`
 * - Persist token changes via `tokenStorage`
 */
export function GatewayClientProvider({
  children,
  tokenStorage,
  urls,
  oauth2Client,
}: GatewayClientProviderProps) {
  const refreshTokenRef = useRef<string | null>(null);
  const accessTokenRef = useRef<string | null>(null);
  const idTokenRef = useRef<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const fetchTokens = useFetchTokens(urls.token, refreshTokenRef, oauth2Client);
  const { setIdToken, setRefreshToken, setAccessToken } = useTokensSetters(
    tokenStorage,
    setUser,
    idTokenRef,
    refreshTokenRef,
    accessTokenRef
  );

  useRestoreTokens(tokenStorage, setRefreshToken, setIdToken);
  useUpdateGatewayClient(
    GatewayClient,
    refreshTokenRef,
    accessTokenRef,
    idTokenRef,
    tokenStorage,
    fetchTokens
  );

  return (
    <GatewayClientContext.Provider
      value={{
        client: GatewayClient,
        refreshToken: refreshTokenRef.current,
        accessToken: accessTokenRef.current,
        idToken: idTokenRef.current,
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
