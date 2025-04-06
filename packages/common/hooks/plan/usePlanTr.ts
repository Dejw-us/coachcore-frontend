import { useQuery } from "@tanstack/react-query";
import { getPlanTr } from "../../services/api";
import { planTrKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export function usePlanTr(planId: string) {
  const client = useGatewayClient();

  return useQuery({
    queryKey: planTrKey(planId),
    queryFn: async () => {
      return getPlanTr(client, planId);
    },
  });
}
