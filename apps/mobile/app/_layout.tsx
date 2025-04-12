import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GatewayClientProvider, ID_TOKEN, LOG, REFRESH_TOKEN } from "common";
import {
  OAuth2ClientCredentials,
  TokenStorage,
  Urls,
} from "common/hooks/gateway/GatewayClient.types";
import "../global.css";

export const tokenStorage: TokenStorage = {
  persistRefreshToken: async (token) => {
    console.log("Saving refresh token: " + token);
    await AsyncStorage.setItem(REFRESH_TOKEN, token);
  },
  restoreRefreshToken: async () => {
    console.log("Restoring refresh token");
    return await AsyncStorage.getItem(REFRESH_TOKEN);
  },
  clearRefreshToken: async () => {
    console.log("Clearing refresh token");
    await AsyncStorage.removeItem(REFRESH_TOKEN);
  },
  persistIdToken: async (token) => {
    console.log("Saving id token: " + token);
    await AsyncStorage.setItem(ID_TOKEN, token);
  },
  restoreIdToken: async () => {
    console.log("Restoring id token");
    return await AsyncStorage.getItem(ID_TOKEN);
  },
  clearIdToken: async () => {
    console.log("Clearing id token");
    await AsyncStorage.removeItem(ID_TOKEN);
  },
};

const oauth2Client: OAuth2ClientCredentials = {
  id: process.env.EXPO_PUBLIC_CLIENT_ID!,
  secret: process.env.EXPO_PUBLIC_CLIENT_SECRET!,
};

const urls: Urls = {
  gateway: process.env.EXPO_PUBLIC_GATEWAY_URL!,
  token: process.env.EXPO_PUBLIC_TOKEN_URL!,
};

export default function RootLayout() {
  LOG.setLevel("debug");

  return (
    <QueryClientProvider client={new QueryClient()}>
      <GatewayClientProvider
        oauth2Client={oauth2Client}
        urls={urls}
        tokenStorage={tokenStorage}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </GatewayClientProvider>
    </QueryClientProvider>
  );
}
