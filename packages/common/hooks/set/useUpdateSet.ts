import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchSet, TrainingSet, TrainingSetPatch } from "../../services/api";
import { filterAndAddQueryData, setsKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export function useUpdateSet(
  planId: string,
  exerciseId: string,
  setId: string
) {
  const queryClient = useQueryClient();
  const gatewayClient = useGatewayClient();

  return useMutation({
    mutationFn: (data: TrainingSetPatch) =>
      patchSet(gatewayClient, planId, setId, data),
    onSuccess: (updatedSet) =>
      filterAndAddQueryData<TrainingSet>(
        queryClient,
        setsKey(planId, exerciseId),
        (old) => old.id != updatedSet.id,
        updatedSet
      ),
    onError: (error: Error) =>
      console.debug("Error updating set: ", error.message),
  });
}
