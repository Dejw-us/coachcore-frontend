import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSet } from "../../services/api";
import { addQueryData, setsKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export function useCreateSet(planId: string, exerciseId: string) {
  const client = useQueryClient();
  const gatewayClient = useGatewayClient();

  return useMutation({
    mutationFn: () => postSet(gatewayClient, planId, exerciseId),
    onError: (error: Error) =>
      console.error("Error creating unit:", error.message),
    onSuccess: (createdSet) =>
      addQueryData(client, setsKey(planId, exerciseId), createdSet),
  });
}
