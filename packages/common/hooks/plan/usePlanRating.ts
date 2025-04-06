import { useQuery } from "@tanstack/react-query";
import { getPlanRating } from "../../services/api";
import { planRatingKey } from "../../utils/helpers.query";
import { useGatewayClient } from "../gateway";

export function usePlanRating(planId: string) {
  const gatewayClient = useGatewayClient();

  return useQuery({
    queryKey: planRatingKey(planId),
    queryFn: () => getPlanRating(gatewayClient, planId),
  });
}
