import { TrainingGoal } from "common";
import Mapper from "common/components/Mapper";
import { Text, View } from "react-native";
import Header from "../Header";

export type PlanGoalsProps = {
  goals: TrainingGoal[];
};

export default function PlanGoals({ goals }: PlanGoalsProps) {
  return (
    <View>
      <Header value="Goals" />
      <Mapper
        value={goals}
        render={(goal) => <Text key={goal.id}>- {goal.description}</Text>}
      />
    </View>
  );
}
