import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSet } from "../../services/api";
import { addQueryData, setsKey } from "../../utils";

export function useCreateSet(planId: string, exerciseId: string) {
  const client = useQueryClient();

  return useMutation({
    mutationFn: () => postSet(planId, exerciseId),
    onError: (error: Error) =>
      console.error("Error creating unit:", error.message),
    onSuccess: (createdSet) =>
      addQueryData(client, setsKey(planId, exerciseId), createdSet),
  });
}
