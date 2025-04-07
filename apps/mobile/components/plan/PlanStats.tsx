import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native";

export type PlanStatsProps = {
  users: number;
  stars: 0 | 1 | 2 | 3 | 4 | 5;
};

export default function PlanStats({ users, stars }: PlanStatsProps) {
  return (
    <View className="flex flex-row items-center justify-around space-x-4">
      <Text>
        {users} {users === 1 ? "User" : "Users"}
      </Text>

      <View className="flex flex-row space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <AntDesign
            key={i}
            name={i < stars ? "star" : "staro"}
            size={16}
            color="gold"
          />
        ))}
      </View>
    </View>
  );
}
