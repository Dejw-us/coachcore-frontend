import { useQuery } from "@tanstack/react-query";
import { getSets } from "../../services/api";
import { setsKey } from "../../utils";

export function useSets(planId: string, exerciseId: string) {
  return useQuery({
    queryFn: () => getSets(planId, exerciseId),
    queryKey: setsKey(planId, exerciseId),
  });
}
