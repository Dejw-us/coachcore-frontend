import { useQuery } from "@tanstack/react-query";
import { getUnit } from "../../services/api";
import { unitKey } from "../../utils";

export const useUnit = (planId: string, unitId: string) => {
  return useQuery({
    queryKey: unitKey(unitId),
    queryFn: () => getUnit(planId, unitId),
  });
};
