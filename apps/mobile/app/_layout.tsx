import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  GatewayClientProvider,
  ID_TOKEN,
  OAuth2ClientCredentials,
  REFRESH_TOKEN,
  TokenStorage,
  Urls,
} from "common";
import { Text } from "react-native";
import "../global.css";

const tokenStorage: TokenStorage = {
  persistRefreshToken: async (token) => {
    await AsyncStorage.setItem(REFRESH_TOKEN, token);
  },
  restoreRefreshToken: async () => await AsyncStorage.getItem(REFRESH_TOKEN),
  persistIdToken: async (token) => {
    await AsyncStorage.setItem(ID_TOKEN, token);
  },
  restoreIdToken: async () => await AsyncStorage.getItem(ID_TOKEN),
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
        <Text
          className="text-4xl m-2"
          onPress={async () => {
            console.log("test");
            const token = await AsyncStorage.getItem(REFRESH_TOKEN);
            const idToken = await AsyncStorage.getItem(ID_TOKEN);
            console.log("Refresh token log: " + token);
            console.log("Id token log: " + idToken);
          }}
        >
          LOG
        </Text>
      </GatewayClientProvider>
    </QueryClientProvider>
  );
}
