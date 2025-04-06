import { AxiosRequestConfig } from "axios";
import { GatewayClientState } from "../../hooks/gateway/GatewayClient.types";
import { request } from "../../utils/index";
import {
  CreateTrainingPlan,
  DeletedObject,
  ExerciseCategory,
  SavedPlan,
  TrainingPlan,
  TrainingPlanRating,
  TrainingPlanTr,
} from "./trainingApi.types";

export function deletePlan(
  { client }: GatewayClientState,
  planId: string
): Promise<DeletedObject> {
  return request(client.delete(`/training-plans/${planId}`));
}

export function getSavedPlans({
  client,
}: GatewayClientState): Promise<SavedPlan[]> {
  return request(client.get("/v1/saved-plans"));
}

export function getPlans({
  client,
}: GatewayClientState): Promise<TrainingPlan[]> {
  return request(client.get("/v1/public/training-plans"));
}

export function getPlanRating(
  { client }: GatewayClientState,
  planId: string
): Promise<TrainingPlanRating> {
  return request(client.get(`/v1/rating/${planId}/average`));
}

export function getUserPlans({
  client,
}: GatewayClientState): Promise<TrainingPlan[]> {
  return request(client.get("v1/training-plans/me"));
}

export function getPlanTr(
  { client }: GatewayClientState,
  planId: string
): Promise<TrainingPlanTr> {
  return request(client.get(`/v1/public/training-plans/${planId}/tr`));
}

export function postSavePlan(
  { client }: GatewayClientState,
  planId: string
): Promise<SavedPlan> {
  const config: AxiosRequestConfig = {
    params: {
      planId,
    },
  };
  return request(client.post("/v1/saved-plans", {}, config));
}

export function getPlanCategory(
  { client }: GatewayClientState,
  planId: string
): Promise<ExerciseCategory> {
  return request(client.get(`/v1/public/training-plans/${planId}/category`));
}

export function getPlan(
  { client }: GatewayClientState,
  id: string
): Promise<TrainingPlan> {
  return request(client.get(`v1/public/training-plans/${id}`));
}

export function postPlan(
  { client }: GatewayClientState,
  plan: CreateTrainingPlan
): Promise<TrainingPlan> {
  return request(client.post("v1/training-plans", plan));
}
