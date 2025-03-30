import { useQuery } from "@tanstack/react-query";
import { getPlan } from "../../services/api";
import { planKey } from "../../utils";

export const usePlan = (planId: string) => {
  return useQuery({
    queryKey: planKey(planId),
    queryFn: () => getPlan(planId),
  });
};
