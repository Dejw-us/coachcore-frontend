import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postExercise } from "../../services/api";
import { addQueryData, exercisesKey } from "../../utils";

export function useCreateExercise(planId: string, unitId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (catalogExerciseId: string) =>
      postExercise(catalogExerciseId, planId, unitId),
    onSuccess: (exercise) =>
      addQueryData(queryClient, exercisesKey(planId, unitId), exercise),
  });
}
