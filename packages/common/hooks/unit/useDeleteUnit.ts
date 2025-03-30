import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeletedObject, deleteUnit, TrainingUnit } from "../../services/api";
import {
  filterQueryData,
  invalidateQueries,
  planUnitsKey,
  unitKey,
} from "../../utils";

export default function useDeleteUnit(planId: string, unitId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteUnit(planId, unitId),
    onSuccess: (deletedUnit: DeletedObject) => {
      invalidateQueries(queryClient, unitKey(deletedUnit.id));
      filterQueryData<TrainingUnit>(
        queryClient,
        planUnitsKey(planId),
        (unit) => unit.id !== deletedUnit.id
      );
    },
  });
}
