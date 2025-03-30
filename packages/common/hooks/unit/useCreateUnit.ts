import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTrainingUnit, postUnit, TrainingUnit } from "../../services/api";
import { addQueryData, planUnitsKey } from "../../utils";

export const useCreateUnit = (planId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (unit: CreateTrainingUnit) => postUnit(planId, unit),
    onError: (error: Error) =>
      console.error("Error creating unit:", error.message),
    onSuccess: (createdUnit: TrainingUnit) =>
      addQueryData(queryClient, planUnitsKey(planId), createdUnit),
  });
};
