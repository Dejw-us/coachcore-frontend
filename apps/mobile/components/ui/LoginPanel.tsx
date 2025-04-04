import { useOAuth2Client } from "@/hooks/oauth2/useOAuth2Client";
import { useAuth } from "common";
import { Text, View } from "react-native";

export function LoginPanel() {
  const { login, logout } = useOAuth2Client();
  const { user } = useAuth();

  if (user != null) {
    return (
      <View className="flex flex-row justify-between bg-slate-200 border-1 border m-2">
        <Text className="p-2 bg-slate-300" onPress={async () => await logout()}>
          Logout
        </Text>
        <Text className="p-2 bg-slate-300">{user.username}</Text>
      </View>
    );
  }
  return (
    <View className="flex flex-row justify-between bg-white mb-2">
      <Text className="p-2 m-2 border-1 border">Coachcore</Text>
      <Text
        className="p-2 border border-1 m-2"
        onPress={async () => await login()}
      >
        Login
      </Text>
    </View>
  );
}
