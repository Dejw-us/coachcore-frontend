import { GatewayClient } from "../../hooks";
import { request } from "../../utils";
import {
  CreateTrainingUnit,
  TrainingUnit,
  UnitDisplay,
  UnitDisplayPatch,
} from "./trainingApi.types.js";

export function getUnit(
  { client }: GatewayClient,
  planId: string,
  unitId: string
): Promise<TrainingUnit> {
  return request(client.get(`/training-plans/${planId}/units/${unitId}`));
}

export function postUnit(
  { client }: GatewayClient,
  planId: string,
  unit: CreateTrainingUnit
): Promise<TrainingUnit> {
  return request(client.post(`/training-plans/${planId}/units`, unit));
}

export function getUnitDisplay(
  { client }: GatewayClient,
  planId: string,
  unitId: string
): Promise<UnitDisplay> {
  return request(
    client.get(`/training-plans/${planId}/units/${unitId}/display`)
  );
}

export function patchUnitDisplay(
  { client }: GatewayClient,
  planId: string,
  unitId: string,
  patch: UnitDisplayPatch
) {
  return request(
    client.patch(`/training-plans/${planId}/units/${unitId}/display`, patch)
  );
}

export function deleteUnit(
  { client }: GatewayClient,
  planId: string,
  unitId: string
) {
  return request(client.delete(`/training-plans/${planId}/units/${unitId}`));
}

export function getUnits(
  { client }: GatewayClient,
  planId: string
): Promise<TrainingUnit[]> {
  return request(client.get(`/training-plans/${planId}/units`));
}
