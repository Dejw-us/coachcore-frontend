import { Text, View } from "react-native";

export type PlanStatsProps = {
  users: number;
  stars: 0 | 1 | 2 | 3 | 4 | 5;
};

export default function PlanStats({ users, stars }: PlanStatsProps) {
  return (
    <View className="flex flex-row justify-around">
      <Text>
        {users} {users === 1 ? "User" : "Users"}
      </Text>

      <Text>{stars === 0 ? "No reviews" : "*".repeat(stars)}</Text>
    </View>
  );
}
