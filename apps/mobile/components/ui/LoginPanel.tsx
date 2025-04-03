import { useOAuth2Client } from "@/hooks/oauth2/useOAuth2Client";
import { Button, View } from "react-native";

export function LoginPanel() {
  const { login } = useOAuth2Client();

  return (
    <View>
      <Button onPress={async () => await login()} title="Login" />
    </View>
  );
}
