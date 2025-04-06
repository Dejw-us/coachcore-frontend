import { useQuery } from "@tanstack/react-query";
import { getUserPlans } from "../../services/api";
import { allUserPlanKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export const useUserPlans = () => {
  const client = useGatewayClient();

  return useQuery({
    queryKey: allUserPlanKey(),
    queryFn: async () => {
      const plans = await getUserPlans(client);
      return plans;
    },
  });
};
