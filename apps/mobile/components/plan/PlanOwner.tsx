import { Image, Text, View } from "react-native";

export type PlanOwnerProps = {
  username: string;
  description: string;
};

export default function PlanOwner({ username, description }: PlanOwnerProps) {
  return (
    <View>
      <View className="flex flex-row justify-between mb-2.5">
        <Image
          className="h-12 w-12"
          source={require("../../assets/images/icon.png")}
        />
        <Text className="ml-2.5 flex-1 self-center">{username}</Text>
        <Text className="self-center">Follow</Text>
      </View>
      <Text>{description}</Text>
    </View>
  );
}
