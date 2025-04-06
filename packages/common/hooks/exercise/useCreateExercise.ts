import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postExercise } from "../../services/api";
import { addQueryData, exercisesKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export function useCreateExercise(planId: string, unitId: string) {
  const queryClient = useQueryClient();
  const gatewayClient = useGatewayClient();

  return useMutation({
    mutationFn: (catalogExerciseId: string) =>
      postExercise(gatewayClient, catalogExerciseId, planId, unitId),
    onSuccess: (exercise) =>
      addQueryData(queryClient, exercisesKey(planId, unitId), exercise),
  });
}
