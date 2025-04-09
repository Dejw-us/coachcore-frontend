import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TrainingPlan } from "common"; // adjust to your actual model
import { getPlan } from "../../services/api";
import { allPlansKey, planKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export const usePlan = (planId: string) => {
  const gatewayClient = useGatewayClient();
  const queryClient = useQueryClient();

  return useQuery<TrainingPlan>({
    queryKey: planKey(planId),
    queryFn: async () => {
      const cache = queryClient.getQueryData<TrainingPlan[]>(allPlansKey());

      if (cache) {
        const cachedPlan = cache.find((plan) => plan.id === planId);
        if (cachedPlan) {
          return cachedPlan;
        }
      }

      return await getPlan(gatewayClient, planId);
    },
  });
};
