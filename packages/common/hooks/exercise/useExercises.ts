import { useQuery } from "@tanstack/react-query";
import { getExercises } from "../../services/api";
import { exercisesKey } from "../../utils";

export function useExercises(planId: string, unitId: string) {
  return useQuery({
    queryFn: () => getExercises(planId, unitId),
    queryKey: exercisesKey(planId, unitId),
  });
}
