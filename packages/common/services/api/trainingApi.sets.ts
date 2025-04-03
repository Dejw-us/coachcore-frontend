import { request } from "../../utils/index";
import { gatewayClient } from "./gatewayClient";
import {
  DeletedObject,
  TrainingSet,
  TrainingSetPatch,
} from "./trainingApi.types";

export function getSets(
  planId: string,
  exerciseId: string
): Promise<TrainingSet[]> {
  return request(
    gatewayClient.get(`/training-plans/${planId}/exercises/${exerciseId}/sets`)
  );
}

export function patchSet(
  planId: string,
  setId: string,
  update: TrainingSetPatch
): Promise<TrainingSet> {
  return request(
    gatewayClient.patch(`/training-plans/${planId}/sets/${setId}`, update)
  );
}

export function deleteSet(
  planId: string,
  setId: string
): Promise<DeletedObject> {
  return request(
    gatewayClient.delete(`/training-plans/${planId}/sets/${setId}`)
  );
}

export function postSet(
  planId: string,
  exerciseId: string
): Promise<TrainingSet> {
  return request(
    gatewayClient.post(`/training-plans/${planId}/exercises/${exerciseId}/sets`)
  );
}
