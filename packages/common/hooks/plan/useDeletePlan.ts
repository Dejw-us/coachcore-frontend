import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeletedObject, deletePlan, TrainingPlan } from "../../services/api";
import {
  allUserPlanKey,
  filterQueryData,
  invalidateQueries,
  planKey,
} from "../../utils";
import { useGatewayClient } from "../gateway";

export default function useDeletePlan(planId: string) {
  const queryClient = useQueryClient();
  const gatewayClient = useGatewayClient();

  return useMutation({
    mutationFn: () => deletePlan(gatewayClient, planId),
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
