import { useViewPlan } from "@/hooks/useViewPlan";
import { TrainingPlan } from "common";
import { Text, View } from "react-native";
import CenterView from "../common/CenterView";

export type MyPlanProps = {
  plan: TrainingPlan;
};

export default function MyPlan({ plan }: MyPlanProps) {
  const { viewPlan } = useViewPlan(plan, true);

  return (
    <CenterView>
      <View className="flex flex-row justify-between">
        <Text>{plan.name}</Text>
        <Text onPress={viewPlan} className="border-1 p-1 border rounded">
          Edit
        </Text>
      </View>
    </CenterView>
  );
}
