import { useQuery } from "@tanstack/react-query";
import { getUsedPlans, Page } from "../../services/api";
import { usedPlansKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export function useUsedPlans(page?: Page) {
  const gatewayClient = useGatewayClient();

  return useQuery({
    queryKey: usedPlansKey(),
    queryFn: () => getUsedPlans(gatewayClient, page || { page: 0, size: 10 }),
  });
}
