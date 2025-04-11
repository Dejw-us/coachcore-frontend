import { GatewayClientState } from "../../hooks/gateway/GatewayClient.types";
import { request } from "../../utils/index";
import { DeletedObject } from "./api.types";
import { ExercisePatch, TrainingExercise } from "./trainingApi.types";

export function postExercise(
  { client }: GatewayClientState,
  catalogExerciseId: string,
  planId: string,
  unitId: string
): Promise<TrainingExercise> {
  const params = { catalogExerciseId };
  return request(
    client.post(
      `/v1/training-plans/${planId}/units/${unitId}/exercises`,
      {},
      { params }
    )
  );
}

export function patchExercise(
  { client }: GatewayClientState,
  planId: string,
  exerciseId: string,
  patch: ExercisePatch,
  catalogExerciseId?: string
): Promise<TrainingExercise> {
  const params = {
    catalogExerciseId,
  };
  return request(
    client.patch(
      `/v1/training-plans/${planId}/exercises/${exerciseId}`,
      patch,
      {
        params,
      }
    )
  );
}

export function deleteExercise(
  { client }: GatewayClientState,
  planId: string,
  exerciseId: string
): Promise<DeletedObject> {
  return request(
    client.delete(`/v1/training-plans/${planId}/exercises/${exerciseId}`)
  );
}

export function getExercises(
  { client }: GatewayClientState,
  planId: string,
  unitId: string
): Promise<TrainingExercise[]> {
  return request(
    client.get(`/v1/training-plans/${planId}/units/${unitId}/exercises`)
  );
}
