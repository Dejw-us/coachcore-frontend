import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeletedObject, deleteSet, TrainingSet } from "../../services/api";
import { filterQueryData, setsKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export function useDeleteSet(
  planId: string,
  exerciseId: string,
  setId: string
) {
  const queryClient = useQueryClient();
  const gatewayClient = useGatewayClient();

  return useMutation({
    mutationFn: () => deleteSet(gatewayClient, planId, setId),
    onSuccess: (deletedSet: DeletedObject) =>
      filterQueryData<TrainingSet>(
        queryClient,
        setsKey(planId, exerciseId),
        (set) => set.id !== deletedSet.id
      ),
  });
}
