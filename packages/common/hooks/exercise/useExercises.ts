import { useQuery } from "@tanstack/react-query";
import { getExercises } from "../../services/api";
import { exercisesKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export function useExercises(planId: string, unitId: string) {
  const gatewayClient = useGatewayClient();

  return useQuery({
    queryFn: () => getExercises(gatewayClient, planId, unitId),
    queryKey: exercisesKey(planId, unitId),
  });
}
