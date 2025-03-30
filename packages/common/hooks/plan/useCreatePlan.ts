import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPlan, TrainingPlan } from "../../services/api";
import { allPlansKey, invalidateQueries } from "../../utils";

export const useCreatePlan = (navigate: (path: string) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPlan,
    onError: (error) => console.error("Error creating training plan:", error),
    onSuccess: (plan: TrainingPlan) =>
      invalidateQueries(queryClient, allPlansKey()).then(() =>
        navigate(`/edit-plans/${plan.id}`)
      ),
  });
};
