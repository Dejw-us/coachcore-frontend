import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTrainingPlan, postPlan, TrainingPlan } from "../../services/api";
import { allPlansKey, invalidateQueries } from "../../utils";
import { useGatewayClient } from "../gateway";

export const useCreatePlan = (navigate: (path: string) => void) => {
  const queryClient = useQueryClient();
  const gatewayClient = useGatewayClient();

  return useMutation({
    mutationFn: (newPlan: CreateTrainingPlan) =>
      postPlan(gatewayClient, newPlan),
    onError: (error) => console.error("Error creating training plan:", error),
    onSuccess: (plan: TrainingPlan) =>
      invalidateQueries(queryClient, allPlansKey()).then(() =>
        navigate(`/edit-plans/${plan.id}`)
      ),
  });
};
