import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  patchUnitDisplay,
  UnitDisplay,
  UnitDisplayPatch,
} from "../../services/api";
import { unitDisplayKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export default function useUpdateUnitDisplay(planId: string, unitId: string) {
  const queryClient = useQueryClient();
  const gatewayClient = useGatewayClient();

  return useMutation({
    mutationFn: (patch: UnitDisplayPatch) =>
      patchUnitDisplay(gatewayClient, planId, unitId, patch),
    onSuccess: (updatedDisplay: UnitDisplay) =>
      queryClient.setQueryData(unitDisplayKey(unitId), () => updatedDisplay),
  });
}
