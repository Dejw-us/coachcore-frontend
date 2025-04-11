import { Entypo } from "@expo/vector-icons";
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
        render={(goal) => (
          <View key={goal.id} className="flex flex-row">
            <Entypo name="dot-single" className="self-center" size={15} />
            <Text key={goal.id}>{goal.description}</Text>
          </View>
        )}
      />
    </View>
  );
}
