import { useOAuth2Client } from "@/hooks/oauth2/useOAuth2Client";
import { useAuth } from "common";
import { Button, View } from "react-native";

export function LoginPanel() {
  const { login, logout } = useOAuth2Client();
  const { user } = useAuth();

  if (user != null) {
    return (
      <View>
        <Button onPress={async () => await logout()} title="Logout" />
      </View>
    );
  }
  return (
    <View>
      <Button onPress={async () => await login()} title="Login" />
    </View>
  );
}
