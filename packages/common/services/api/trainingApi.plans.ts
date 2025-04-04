import { GatewayClient } from "../../hooks";
import { request } from "../../utils/index";
import {
  CreateTrainingPlan,
  DeletedObject,
  TrainingPlan,
} from "./trainingApi.types";

export function deletePlan(
  { client }: GatewayClient,
  planId: string
): Promise<DeletedObject> {
  return request(client.delete(`/training-plans/${planId}`));
}

export function getPlans({ client }: GatewayClient): Promise<TrainingPlan[]> {
  return request(client.get("/v1/public/training-plans"));
}

export function getUserPlans({
  client,
}: GatewayClient): Promise<TrainingPlan[]> {
  return request(client.get("v1/training-plans/me"));
}

export function getPlan(
  { client }: GatewayClient,
  id: string
): Promise<TrainingPlan> {
  return request(client.get(`v1/public/training-plans/${id}`));
}

export function postPlan(
  { client }: GatewayClient,
  plan: CreateTrainingPlan
): Promise<TrainingPlan> {
  return request(client.post("v1/training-plans", plan));
}
