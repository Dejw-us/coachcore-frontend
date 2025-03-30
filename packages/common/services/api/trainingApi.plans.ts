import { request } from "../../utils/index";
import { client } from "./gatewayClient";
import {
  CreateTrainingPlan,
  DeletedObject,
  TrainingPlan,
} from "./trainingApi.types";

export function deletePlan(planId: string): Promise<DeletedObject> {
  return request(client.delete(`/training-plans/${planId}`));
}

export function getPlans(): Promise<TrainingPlan[]> {
  console.log("getting plans");
  return request(client.get("/v1/training-plans"));
}

export function getUserPlans(): Promise<TrainingPlan[]> {
  return request(client.get("/training-plans/me"));
}

export function getPlan(id: string): Promise<TrainingPlan> {
  return request(client.get(`/training-plans/${id}`));
}

export function postPlan(plan: CreateTrainingPlan): Promise<TrainingPlan> {
  return request(client.post("/training-plans", plan));
}
