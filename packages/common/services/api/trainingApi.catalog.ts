import { request } from "../../utils/index";
import { gatewayClient } from "./gatewayClient";
import { CatalogExercise } from "./trainingApi.types";

export function getCatalog(): Promise<CatalogExercise[]> {
  return request(gatewayClient.get("/catalog-exercises"));
}
