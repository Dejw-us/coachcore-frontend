import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ExercisePatch,
  patchExercise,
  TrainingExercise,
} from "../../services/api";
import { exercisesKey, filterAndAddQueryData, filterId } from "../../utils";
import { useGatewayClient } from "../gateway";

export default function useUpdateExercise(
  planId: string,
  unitId: string,
  exerciseId: string
) {
  const quertClient = useQueryClient();
  const gatewayClient = useGatewayClient();

  return useMutation({
    mutationFn: (patch: ExercisePatch, catalogExerciseId?: string) =>
      patchExercise(
        gatewayClient,
        planId,
        exerciseId,
        patch,
        catalogExerciseId
      ),
    onSuccess: (updateExercise: TrainingExercise) =>
      filterAndAddQueryData<TrainingExercise>(
        quertClient,
        exercisesKey(planId, unitId),
        filterId(updateExercise),
        updateExercise
      ),
  });
}
