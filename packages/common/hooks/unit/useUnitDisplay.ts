import { useQuery } from "@tanstack/react-query";
import { getUnitDisplay } from "../../services/api";
import { unitDisplayKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export default function useUnitDisplay(planId: string, unitId: string) {
  const gatewayClient = useGatewayClient();

  return useQuery({
    queryKey: unitDisplayKey(unitId),
    queryFn: () => getUnitDisplay(gatewayClient, planId, unitId),
  });
}
