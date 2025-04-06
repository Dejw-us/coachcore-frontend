import { ExerciseCategory, TrainingPlanTr } from "common";
import { ActivityIndicator, Text, View } from "react-native";

export type PlanDetailsProps = {
  weeks: number;
  tr: TrainingPlanTr | undefined;
  category: ExerciseCategory | undefined;
};

export default function PlanDetails({ weeks, tr, category }: PlanDetailsProps) {
  return (
    <View className="flex flex-row justify-between mb-5">
      <Text>
        {weeks} {weeks > 1 ? "Weeks" : "Week"}
      </Text>
      {tr && <Text>{`${tr.trainingDays}/${tr.restDays}`} T/R ?</Text>}
      {!tr && <ActivityIndicator />}
      <Text>{category ? category.name : "This plan has no exercises"}</Text>
    </View>
  );
}
