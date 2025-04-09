import { useQuery } from "@tanstack/react-query";
import { getUnits } from "../../services/api";
import { planUnitsKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export const useUnits = (planId: string) => {
  const gatewayClient = useGatewayClient();

  return useQuery({
    queryKey: planUnitsKey(planId),
    queryFn: async () => {
      const units = await getUnits(gatewayClient, planId);
      if (units) {
        return units.sort((a, b) => a.index - b.index);
      }
    },
  });
};
