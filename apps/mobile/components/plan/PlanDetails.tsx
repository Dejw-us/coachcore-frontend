import { ExerciseCategory, TrainingPlanTr } from "common";
import { ActivityIndicator, Text, View } from "react-native";
import PlanWeeks from "./PlanWeeks";

export type PlanDetailsProps = {
  weeks: number;
  tr: TrainingPlanTr | undefined;
  category: ExerciseCategory | undefined;
};

export default function PlanDetails({ weeks, tr, category }: PlanDetailsProps) {
  return (
    <View className="flex flex-row justify-between mb-5">
      <PlanWeeks weeks={weeks} />
      {tr && <Text>{`${tr.trainingDays}/${tr.restDays}`} T/R ?</Text>}
      {!tr && <ActivityIndicator />}
      <Text>{category ? category.name : "This plan has no exercises"}</Text>
    </View>
  );
}
