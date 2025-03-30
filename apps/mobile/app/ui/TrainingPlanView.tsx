import { TrainingPlan } from "common";
import { Image, Text, View } from "react-native";

export type TrainingPlanViewProps = {
  plan: TrainingPlan;
};

export function TrainingPlanView({ plan }: TrainingPlanViewProps) {
  return (
    <View>
      <Image alt="icon" />
      <Text>{plan.name}</Text>
    </View>
  );
}
