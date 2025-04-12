import { GatewayClientState } from "../../hooks/gateway/GatewayClient.types";
import { request } from "../../utils/index";
import { DeletedObject } from "./api.types";
import { TrainingSet, TrainingSetPatch } from "./trainingApi.types";

export function getSets(
  { client }: GatewayClientState,
  planId: string,
  exerciseId: string
): Promise<TrainingSet[]> {
  return request(
    client.get(`/v1/training-plans/${planId}/exercises/${exerciseId}/sets`)
  );
}

export function patchSet(
  { client }: GatewayClientState,
  planId: string,
  setId: string,
  update: TrainingSetPatch
): Promise<TrainingSet> {
  return request(
    client.patch(`/v1/training-plans/${planId}/sets/${setId}`, update)
  );
}

export function deleteSet(
  { client }: GatewayClientState,
  planId: string,
  setId: string
): Promise<DeletedObject> {
  return request(client.delete(`/v1/training-plans/${planId}/sets/${setId}`));
}

export function postSet(
  { client }: GatewayClientState,
  planId: string,
  exerciseId: string
): Promise<TrainingSet> {
  return request(
    client.post(`/v1/training-plans/${planId}/exercises/${exerciseId}/sets`)
  );
}
