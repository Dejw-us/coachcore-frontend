import { useQuery } from "@tanstack/react-query";
import { getPlans } from "../../services/api";
import { allPlansKey, delay } from "../../utils";
import { useGatewayClient } from "../gateway";

export const usePlans = () => {
  const client = useGatewayClient();

  return useQuery({
    queryKey: allPlansKey(),
    queryFn: async () => {
      await delay(2000);
      return await getPlans(client);
    },
  });
};
