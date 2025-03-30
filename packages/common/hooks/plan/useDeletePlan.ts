import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeletedObject, deletePlan, TrainingPlan } from "../../services/api";
import {
  allUserPlanKey,
  filterQueryData,
  invalidateQueries,
  planKey,
} from "../../utils";

export default function useDeletePlan(planId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePlan(planId),
    onSuccess: (deletedPlan: DeletedObject) => {
      invalidateQueries(queryClient, planKey(deletedPlan.id));
      filterQueryData<TrainingPlan>(
        queryClient,
        allUserPlanKey(),
        (plan) => plan.id !== deletedPlan.id
      );
    },
  });
}
