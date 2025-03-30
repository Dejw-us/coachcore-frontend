import { useQuery } from "@tanstack/react-query";
import { getUserPlans } from "../../services/api";
import { allUserPlanKey } from "../../utils";

export const useUserPlans = () => {
  return useQuery({
    queryKey: allUserPlanKey(),
    queryFn: getUserPlans,
  });
};
