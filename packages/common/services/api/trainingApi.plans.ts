import { AxiosRequestConfig } from "axios";
import { GatewayClientState } from "../../hooks/gateway/GatewayClient.types";
import { request } from "../../utils/index";
import { DeletedObject, Message, Page } from "./api.types";
import {
  CreateTrainingPlan,
  ExerciseCategory,
  PlanPatch,
  SavedPlan,
  TrainingPlan,
  TrainingPlanRating,
  TrainingPlanTr,
  UsedPlan,
} from "./trainingApi.types";

export function patchPlan(
  { client }: GatewayClientState,
  planId: string,
  patch: PlanPatch
): Promise<TrainingPlan> {
  return request(client.patch(`/v1/training-plans/${planId}`, patch));
}

export function deletePlan(
  { client }: GatewayClientState,
  planId: string
): Promise<DeletedObject> {
  return request(client.delete(`/v1/training-plans/${planId}`));
}

export function deleteSavedPlan(
  { client }: GatewayClientState,
  planId: string
): Promise<Message> {
  const config: AxiosRequestConfig = {
    params: {
      planId,
    },
  };
  return request(client.delete("/v1/saved-plans", config));
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

export function getUsedPlans(
  { client }: GatewayClientState,
  page: Page
): Promise<TrainingPlan[]> {
  return request(client.get("/v1/used-plans", { params: page }));
}

export function postUsedPlans(
  { client }: GatewayClientState,
  planId: string
): Promise<UsedPlan> {
  return request(client.post("/v1/used-plans", {}, { params: { planId } }));
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
  return request(
    client.get("v1/training-plans/me", {
      params: { me: true, used: true, saved: true },
    })
  );
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

export function putPlanRating(
  { client }: GatewayClientState,
  planId: string,
  stars: number
): Promise<TrainingPlanRating> {
  return request(client.put(`/v1/rating/${planId}`, { stars }));
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
  return request(client.get(`/v1/public/training-plans/${id}`));
}

export function postPlan(
  { client }: GatewayClientState,
  plan: CreateTrainingPlan
): Promise<TrainingPlan> {
  return request(client.post("/v1/training-plans", plan));
}
