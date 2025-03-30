import { useQuery } from "@tanstack/react-query";
import { getUnits } from "../../services/api";
import { planUnitsKey } from "../../utils";

export const useUnits = (planId: string) => {
  return useQuery({
    queryKey: planUnitsKey(planId),
    queryFn: async () => getUnits(planId),
  });
};
