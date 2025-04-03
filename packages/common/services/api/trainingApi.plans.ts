import { request } from "../../utils/index";
import { gatewayClient } from "./gatewayClient";
import {
  CreateTrainingPlan,
  DeletedObject,
  TrainingPlan,
} from "./trainingApi.types";

export function deletePlan(planId: string): Promise<DeletedObject> {
  return request(gatewayClient.delete(`/training-plans/${planId}`));
}

export function getPlans(): Promise<TrainingPlan[]> {
  console.log("getting plans");
  return request(gatewayClient.get("/v1/public/training-plans"));
}

export function getUserPlans(): Promise<TrainingPlan[]> {
  return request(gatewayClient.get("v1/training-plans/me"));
}

export function getPlan(id: string): Promise<TrainingPlan> {
  return request(gatewayClient.get(`v1/public/training-plans/${id}`));
}

export function postPlan(plan: CreateTrainingPlan): Promise<TrainingPlan> {
  return request(gatewayClient.post("v1/training-plans", plan));
}
