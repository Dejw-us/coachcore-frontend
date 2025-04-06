import { useQuery } from "@tanstack/react-query";
import { getUnit } from "../../services/api";
import { unitKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export const useUnit = (planId: string, unitId: string) => {
  const gatewayClient = useGatewayClient();

  return useQuery({
    queryKey: unitKey(unitId),
    queryFn: () => getUnit(gatewayClient, planId, unitId),
  });
};
