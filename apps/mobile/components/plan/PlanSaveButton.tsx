import { MaterialIcons } from "@expo/vector-icons";
import {
  useDeleteSavedPlan,
  useLogError,
  useSavedPlans,
  useSavePlan,
} from "common";
import { useEffect, useState } from "react";

export type PlanSaveButtonProps = {
  planId: string;
};

export function PlanSaveButton({ planId }: PlanSaveButtonProps) {
  const { mutate: savePlan } = useSavePlan(planId);
  const { data: savedPlans, error } = useSavedPlans();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { mutate: unfollowPlan } = useDeleteSavedPlan(planId);

  useLogError(error, "useSavedPlans");

  useEffect(() => {
    if (savedPlans) {
      console.log("Saved plans: " + JSON.stringify(savedPlans));
      setIsSaved(savedPlans.some((plan) => plan.savedPlan.id === planId));
    }
  }, [savedPlans]);

  if (isSaved) {
    return (
      <MaterialIcons name="bookmark" size={32} onPress={() => unfollowPlan()} />
    );
  }

  return (
    <MaterialIcons
      onPress={() => savePlan()}
      className="self-center"
      name="bookmark-border"
      size={32}
    />
  );
}
