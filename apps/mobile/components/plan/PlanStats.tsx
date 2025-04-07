import { AntDesign } from "@expo/vector-icons";
import { usePlanRating, useUpdatePlanRating } from "common";
import { Text, View } from "react-native";

export type PlanStatsProps = {
  users: number;
  planId: string;
};

export default function PlanStats({ planId, users }: PlanStatsProps) {
  const { data: rating, error: ratingError } = usePlanRating(planId);
  const { mutate: updateRating } = useUpdatePlanRating(planId);

  return (
    <View className="flex flex-row items-center justify-around space-x-4">
      <Text>
        {users} {users === 1 ? "User" : "Users"}
      </Text>

      <View className="flex flex-row space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <AntDesign
            onPress={() => updateRating(i + 1)}
            key={i}
            name={i < (rating?.stars || 0) ? "star" : "staro"}
            size={16}
            color="gold"
          />
        ))}
      </View>
    </View>
  );
}
