import { useMutation } from "@tanstack/react-query";
import { postUsedPlans, TrainingPlan } from "../../services/api";
import { addQueryData, allUserPlanKey } from "../../utils";
import { useClients } from "../common";

export function useUsePlan(planId: string) {
  const { gatewayClient, queryClient } = useClients();

  return useMutation({
    mutationFn: () => postUsedPlans(gatewayClient, planId),
    onSuccess: (usedPlan) =>
      addQueryData<TrainingPlan>(
        queryClient,
        allUserPlanKey(),
        usedPlan.usedPlan
      ),
  });
}
