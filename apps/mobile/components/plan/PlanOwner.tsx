import { Image, Text, View } from "react-native";

export type PlanOwnerProps = {
  username: string;
  description: string;
  userId: string;
};

const PROFILE_URI = process.env.EXPO_PUBLIC_GATEWAY_URL + "/v1/avatars/";

export default function PlanOwner({
  username,
  description,
  userId,
}: PlanOwnerProps) {
  return (
    <View>
      <View className="flex flex-row justify-between mb-2.5">
        <Image
          className="h-12 w-12 rounded-xl border border-1 border-slate-300"
          source={{ uri: PROFILE_URI + userId }}
        />
        <Text className="ml-2.5 flex-1 self-center">{username}</Text>
      </View>
      <Text>{description}</Text>
    </View>
  );
}
