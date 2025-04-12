import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchPlan, PlanPatch, TrainingPlan } from "../../services/api";
import { allPlansKey, filterAndAddQueryData, planKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export function useUpdatePlan(planId: string) {
  const gatewayClient = useGatewayClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (patch: PlanPatch) => patchPlan(gatewayClient, planId, patch),
    onSuccess: (plan) => {
      queryClient.setQueryData(planKey(planId), () => plan);
      filterAndAddQueryData<TrainingPlan>(
        queryClient,
        allPlansKey(),
        (plan) => plan.id !== planId,
        plan
      );
    },
  });
}
