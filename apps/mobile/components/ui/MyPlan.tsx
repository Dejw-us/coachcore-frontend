import { TrainingPlan } from "common";
import { Text } from "react-native";
import CenterView from "../CenterView";

export type MyPlanProps = {
  plan: TrainingPlan;
};

export default function MyPlan({ plan }: MyPlanProps) {
  return (
    <CenterView>
      <Text>{plan.name}</Text>
    </CenterView>
  );
}
