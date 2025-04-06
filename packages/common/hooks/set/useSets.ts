import { useQuery } from "@tanstack/react-query";
import { getSets } from "../../services/api";
import { setsKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export function useSets(planId: string, exerciseId: string) {
  const gatewayClient = useGatewayClient();

  return useQuery({
    queryFn: () => getSets(gatewayClient, planId, exerciseId),
    queryKey: setsKey(planId, exerciseId),
  });
}
