import { GatewayClient } from "../../hooks";
import { request } from "../../utils/index";
import {
  DeletedObject,
  ExercisePatch,
  TrainingExercise,
} from "./trainingApi.types";

export function postExercise(
  { client }: GatewayClient,
  catalogExerciseId: string,
  planId: string,
  unitId: string
): Promise<TrainingExercise> {
  const params = { catalogExerciseId };
  return request(
    client.post(
      `/training-plans/${planId}/units/${unitId}/exercises`,
      {},
      { params }
    )
  );
}

export function patchExercise(
  { client }: GatewayClient,
  planId: string,
  exerciseId: string,
  patch: ExercisePatch,
  catalogExerciseId?: string
): Promise<TrainingExercise> {
  const params = {
    catalogExerciseId,
  };
  return request(
    client.patch(`/training-plans/${planId}/exercises/${exerciseId}`, patch, {
      params,
    })
  );
}

export function deleteExercise(
  { client }: GatewayClient,
  planId: string,
  exerciseId: string
): Promise<DeletedObject> {
  return request(
    client.delete(`/training-plans/${planId}/exercises/${exerciseId}`)
  );
}

export function getExercises(
  { client }: GatewayClient,
  planId: string,
  unitId: string
): Promise<TrainingExercise[]> {
  return request(
    client.get(`/training-plans/${planId}/units/${unitId}/exercises`)
  );
}
