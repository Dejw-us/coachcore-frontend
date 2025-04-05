import { useOAuth2Client } from "@/hooks/useOAuth2Client";
import { useGatewayClient } from "common";
import { Image, Text, View } from "react-native";

export default function UserPanel() {
  const { user } = useGatewayClient();
  const { login, logout } = useOAuth2Client();

  return (
    <View className="flex flex-row justify-between bg-white pb-1 pt-1 mb-2">
      <View className="flex flex-row">
        <Image
          className="w-10 h-10 self-center ml-2"
          source={require("../../assets/images/icon.png")}
        />
        <Text className="p-2 text-2xl">Coachcore</Text>
      </View>
      {user && (
        <View className="flex flex-row">
          <Text onPress={async () => await logout()}>Logout (tmp)</Text>
          <Text className="p-2 text-xl">{user.username}</Text>
          <Image
            className="w-10 h-10 self-center mr-2"
            source={require("../../assets/images/icon.png")}
          />
          {/** TODO fetch user image */}
        </View>
      )}

      {!user && (
        <Text className="p-2 text-xl" onPress={async () => await login()}>
          Login
        </Text>
      )}
    </View>
  );
}
