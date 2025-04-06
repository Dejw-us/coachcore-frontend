import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeletedObject, deleteUnit, TrainingUnit } from "../../services/api";
import {
  filterQueryData,
  invalidateQueries,
  planUnitsKey,
  unitKey,
} from "../../utils";
import { useGatewayClient } from "../gateway";

export default function useDeleteUnit(planId: string, unitId: string) {
  const queryClient = useQueryClient();
  const gatewayClient = useGatewayClient();

  return useMutation({
    mutationFn: () => deleteUnit(gatewayClient, planId, unitId),
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
