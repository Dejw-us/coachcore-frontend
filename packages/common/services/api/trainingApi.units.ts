import { request } from "../../utils";
import { gatewayClient } from "./gatewayClient";
import {
  CreateTrainingUnit,
  TrainingUnit,
  UnitDisplay,
  UnitDisplayPatch,
} from "./trainingApi.types.js";

export function getUnit(planId: string, unitId: string): Promise<TrainingUnit> {
  return request(
    gatewayClient.get(`/training-plans/${planId}/units/${unitId}`)
  );
}

export function postUnit(
  planId: string,
  unit: CreateTrainingUnit
): Promise<TrainingUnit> {
  return request(gatewayClient.post(`/training-plans/${planId}/units`, unit));
}

export function getUnitDisplay(
  planId: string,
  unitId: string
): Promise<UnitDisplay> {
  return request(
    gatewayClient.get(`/training-plans/${planId}/units/${unitId}/display`)
  );
}

export function patchUnitDisplay(
  planId: string,
  unitId: string,
  patch: UnitDisplayPatch
) {
  return request(
    gatewayClient.patch(
      `/training-plans/${planId}/units/${unitId}/display`,
      patch
    )
  );
}

export function deleteUnit(planId: string, unitId: string) {
  return request(
    gatewayClient.delete(`/training-plans/${planId}/units/${unitId}`)
  );
}

export function getUnits(planId: string): Promise<TrainingUnit[]> {
  return request(gatewayClient.get(`/training-plans/${planId}/units`));
}
