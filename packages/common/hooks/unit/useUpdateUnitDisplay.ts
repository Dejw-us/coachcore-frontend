import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  patchUnitDisplay,
  UnitDisplay,
  UnitDisplayPatch,
} from "../../services/api";
import { unitDisplayKey } from "../../utils";

export default function useUpdateUnitDisplay(planId: string, unitId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (patch: UnitDisplayPatch) =>
      patchUnitDisplay(planId, unitId, patch),
    onSuccess: (updatedDisplay: UnitDisplay) =>
      queryClient.setQueryData(unitDisplayKey(unitId), () => updatedDisplay),
  });
}
