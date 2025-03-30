import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeletedObject, deleteSet, TrainingSet } from "../../services/api";
import { filterQueryData, setsKey } from "../../utils";

export function useDeleteSet(
  planId: string,
  exerciseId: string,
  setId: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteSet(planId, setId),
    onSuccess: (deletedSet: DeletedObject) =>
      filterQueryData<TrainingSet>(
        queryClient,
        setsKey(planId, exerciseId),
        (set) => set.id !== deletedSet.id
      ),
  });
}
