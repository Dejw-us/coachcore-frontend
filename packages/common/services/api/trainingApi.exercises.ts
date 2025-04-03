import { request } from "../../utils/index";
import { gatewayClient } from "./gatewayClient";
import {
  DeletedObject,
  ExercisePatch,
  TrainingExercise,
} from "./trainingApi.types";

export function postExercise(
  catalogExerciseId: string,
  planId: string,
  unitId: string
): Promise<TrainingExercise> {
  const params = { catalogExerciseId };
  return request(
    gatewayClient.post(
      `/training-plans/${planId}/units/${unitId}/exercises`,
      {},
      { params }
    )
  );
}

export function patchExercise(
  planId: string,
  exerciseId: string,
  patch: ExercisePatch,
  catalogExerciseId?: string
): Promise<TrainingExercise> {
  const params = {
    catalogExerciseId,
  };
  return request(
    gatewayClient.patch(
      `/training-plans/${planId}/exercises/${exerciseId}`,
      patch,
      {
        params,
      }
    )
  );
}

export function deleteExercise(
  planId: string,
  exerciseId: string
): Promise<DeletedObject> {
  return request(
    gatewayClient.delete(`/training-plans/${planId}/exercises/${exerciseId}`)
  );
}

export function getExercises(
  planId: string,
  unitId: string
): Promise<TrainingExercise[]> {
  return request(
    gatewayClient.get(`/training-plans/${planId}/units/${unitId}/exercises`)
  );
}
