import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSavedPlan, SavedPlan } from "../../services/api";
import { filterQueryData, savedPlansKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export function useDeleteSavedPlan(planId: string) {
  const client = useGatewayClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteSavedPlan(client, planId),
    onSuccess: (message) => {
      console.log("Message: " + message.message);
      filterQueryData<SavedPlan>(
        queryClient,
        savedPlansKey(),
        (savedPlan) => savedPlan.savedPlan.id !== planId
      );
    },
  });
}
