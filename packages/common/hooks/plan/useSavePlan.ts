import { useMutation } from "@tanstack/react-query";
import { postSavePlan } from "../../services/api";
import { useGatewayClient } from "../gateway";

export function useSavePlan(planId: string) {
  const client = useGatewayClient();

  return useMutation({
    mutationFn: () => postSavePlan(client, planId),
    onSuccess: () => console.log("Saved plan"),
    onError: (error: Error) =>
      console.log("Error saving plan: " + error.message),
  });
}
