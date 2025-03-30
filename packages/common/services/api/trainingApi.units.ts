import { request } from "../../utils";
import { client } from "./gatewayClient";
import {
  CreateTrainingUnit,
  TrainingUnit,
  UnitDisplay,
  UnitDisplayPatch,
} from "./trainingApi.types.js";

export function getUnit(planId: string, unitId: string): Promise<TrainingUnit> {
  return request(client.get(`/training-plans/${planId}/units/${unitId}`));
}

export function postUnit(
  planId: string,
  unit: CreateTrainingUnit
): Promise<TrainingUnit> {
  return request(client.post(`/training-plans/${planId}/units`, unit));
}

export function getUnitDisplay(
  planId: string,
  unitId: string
): Promise<UnitDisplay> {
  return request(
    client.get(`/training-plans/${planId}/units/${unitId}/display`)
  );
}

export function patchUnitDisplay(
  planId: string,
  unitId: string,
  patch: UnitDisplayPatch
) {
  return request(
    client.patch(`/training-plans/${planId}/units/${unitId}/display`, patch)
  );
}

export function deleteUnit(planId: string, unitId: string) {
  return request(client.delete(`/training-plans/${planId}/units/${unitId}`));
}

export function getUnits(planId: string): Promise<TrainingUnit[]> {
  return request(client.get(`/training-plans/${planId}/units`));
}
