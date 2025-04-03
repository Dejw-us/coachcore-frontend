import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GatewayClientProvider } from "common";
import "../global.css";

export default function RootLayout() {
  return (
    <GatewayClientProvider>
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
