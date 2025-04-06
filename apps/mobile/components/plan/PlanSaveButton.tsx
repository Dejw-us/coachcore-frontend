import { MaterialIcons } from "@expo/vector-icons";
import { useLogError, useSavedPlans, useSavePlan } from "common";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export type PlanSaveButtonProps = {
  planId: string;
};

export function PlanSaveButton({ planId }: PlanSaveButtonProps) {
  const { mutate: savePlan } = useSavePlan(planId);
  const { data: savedPlans, error } = useSavedPlans();
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useLogError(error, "useSavedPlans");

  useEffect(() => {
    if (savedPlans) {
      setIsSaved(savedPlans.some((plan) => plan.savedPlan.id === planId));
    }
  }, [savedPlans]);

  if (isSaved) {
    return <Text>Saved</Text>;
  }

  return (
    <MaterialIcons
      onPress={() => savePlan()}
      className="self-center"
      name="save-alt"
      size={32}
    />
  );
}
