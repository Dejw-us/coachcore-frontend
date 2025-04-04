import { GatewayClient } from "../../hooks";
import { request } from "../../utils/index";
import {
  DeletedObject,
  TrainingSet,
  TrainingSetPatch,
} from "./trainingApi.types";

export function getSets(
  { client }: GatewayClient,
  planId: string,
  exerciseId: string
): Promise<TrainingSet[]> {
  return request(
    client.get(`/training-plans/${planId}/exercises/${exerciseId}/sets`)
  );
}

export function patchSet(
  { client }: GatewayClient,
  planId: string,
  setId: string,
  update: TrainingSetPatch
): Promise<TrainingSet> {
  return request(
    client.patch(`/training-plans/${planId}/sets/${setId}`, update)
  );
}

export function deleteSet(
  { client }: GatewayClient,
  planId: string,
  setId: string
): Promise<DeletedObject> {
  return request(client.delete(`/training-plans/${planId}/sets/${setId}`));
}

export function postSet(
  { client }: GatewayClient,
  planId: string,
  exerciseId: string
): Promise<TrainingSet> {
  return request(
    client.post(`/training-plans/${planId}/exercises/${exerciseId}/sets`)
  );
}
