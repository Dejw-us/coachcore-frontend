import { GatewayClientState } from "../../hooks/gateway/GatewayClient.types";
import { request } from "../../utils";
import {
  CreateTrainingUnit,
  DeletedObject,
  TrainingUnit,
  UnitDisplay,
  UnitDisplayPatch,
} from "./trainingApi.types.js";

export function getUnit(
  { client }: GatewayClientState,
  planId: string,
  unitId: string
): Promise<TrainingUnit> {
  return request(client.get(`/training-plans/${planId}/units/${unitId}`));
}

export function postUnit(
  { client }: GatewayClientState,
  planId: string,
  unit: CreateTrainingUnit
): Promise<TrainingUnit> {
  return request(client.post(`/training-plans/${planId}/units`, unit));
}

export function getUnitDisplay(
  { client }: GatewayClientState,
  planId: string,
  unitId: string
): Promise<UnitDisplay> {
  return request(
    client.get(`/training-plans/${planId}/units/${unitId}/display`)
  );
}

export function patchUnitDisplay(
  { client }: GatewayClientState,
  planId: string,
  unitId: string,
  patch: UnitDisplayPatch
): Promise<UnitDisplay> {
  return request(
    client.patch(`/training-plans/${planId}/units/${unitId}/display`, patch)
  );
}

export function deleteUnit(
  { client }: GatewayClientState,
  planId: string,
  unitId: string
): Promise<DeletedObject> {
  return request(client.delete(`/training-plans/${planId}/units/${unitId}`));
}

export function getUnits(
  { client }: GatewayClientState,
  planId: string
): Promise<TrainingUnit[]> {
  return request(client.get(`/training-plans/${planId}/units`));
}
