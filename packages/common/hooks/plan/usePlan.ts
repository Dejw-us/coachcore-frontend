import { useQuery } from "@tanstack/react-query";
import { getPlan } from "../../services/api";
import { planKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export const usePlan = (planId: string) => {
  const gatewayClient = useGatewayClient();

  return useQuery({
    queryKey: planKey(planId),
    queryFn: () => getPlan(gatewayClient, planId),
  });
};
