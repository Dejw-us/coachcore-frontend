import { useQuery } from "@tanstack/react-query";
import { getUnitDisplay } from "../../services/api";
import { unitDisplayKey } from "../../utils";

export default function useUnitDisplay(planId: string, unitId: string) {
  return useQuery({
    queryKey: unitDisplayKey(unitId),
    queryFn: () => getUnitDisplay(planId, unitId),
  });
}
