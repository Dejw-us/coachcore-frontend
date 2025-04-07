import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSavePlan, SavedPlan } from "../../services/api";
import { addQueryData, savedPlansKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export function useSavePlan(planId: string) {
  const client = useGatewayClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postSavePlan(client, planId),
    onSuccess: (savedPlan) => {
      console.log("Saved plan");
      addQueryData<SavedPlan>(queryClient, savedPlansKey(), savedPlan);
    },
    onError: (error: Error) =>
      console.log("Error saving plan: " + error.message),
  });
}
