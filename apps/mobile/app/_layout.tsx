import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GatewayClientProvider, REFRESH_TOKEN } from "common";
import "../global.css";

export default function RootLayout() {
  return (
    <GatewayClientProvider
      clientId={process.env.EXPO_PUBLIC_CLIENT_ID!}
      clientSecret={process.env.EXPO_PUBLIC_CLIENT_SECRET!}
      getRefreshToken={async () => AsyncStorage.getItem(REFRESH_TOKEN)}
      saveRefreshToken={(token) => AsyncStorage.setItem(REFRESH_TOKEN, token)}
      tokenUrl={process.env.EXPO_PUBLIC_TOKEN_URL!}
    >
      <QueryClientProvider client={new QueryClient()}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </QueryClientProvider>
    </GatewayClientProvider>
  );
}
