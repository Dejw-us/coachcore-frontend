import { useQuery } from "@tanstack/react-query";
import { getPlanCategory } from "../../services/api";
import { planCategoryKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export function usePlanCategory(planId: string) {
  const client = useGatewayClient();

  return useQuery({
    queryKey: planCategoryKey(planId),
    queryFn: () => getPlanCategory(client, planId),
  });
}
