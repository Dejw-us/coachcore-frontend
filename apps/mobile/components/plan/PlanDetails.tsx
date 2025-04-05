import { Text, View } from "react-native";

export type PlanDetailsProps = {
  weeks: number;
};

export default function PlanDetails({ weeks }: PlanDetailsProps) {
  return (
    <View className="flex flex-row justify-between mb-5">
      <Text>
        {weeks} {weeks > 1 ? "Weeks" : "Week"}
      </Text>
      <Text>5/2 T/R ?</Text>
      <Text>Legs</Text>
    </View>
  );
}
