import { useQuery } from "@tanstack/react-query";
import { getPlans } from "../../services/api";
import { allPlansKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export const usePlans = () => {
  const client = useGatewayClient();
  return useQuery({
    queryKey: allPlansKey(),
    queryFn: () => getPlans(client),
  });
};
