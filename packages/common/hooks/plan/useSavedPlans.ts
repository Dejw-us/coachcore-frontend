import { useQuery } from "@tanstack/react-query";
import { getSavedPlans } from "../../services/api";
import { savedPlanKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export function useSavedPlans() {
  const client = useGatewayClient();

  return useQuery({
    queryKey: savedPlanKey(),
    queryFn: () => getSavedPlans(client),
  });
}
