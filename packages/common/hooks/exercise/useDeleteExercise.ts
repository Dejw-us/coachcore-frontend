import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExercise, TrainingExercise } from "../../services/api";
import { exercisesKey, filterQueryData } from "../../utils";

export default function useDeleteExercise(
  planId: string,
  unitId: string,
  exerciseId: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteExercise(planId, exerciseId),
    onSuccess: (deletedExercise) =>
      filterQueryData<TrainingExercise>(
        queryClient,
        exercisesKey(planId, unitId),
        (exercise) => exercise.id !== deletedExercise.id
      ),
  });
}
