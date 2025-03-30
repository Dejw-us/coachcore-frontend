import { request } from "../../utils/index";
import { client } from "./gatewayClient";
import { CatalogExercise } from "./trainingApi.types";

export function getCatalog(): Promise<CatalogExercise[]> {
  return request(client.get("/catalog-exercises"));
}
