import { GatewayClient } from "../../hooks";
import { request } from "../../utils/index";
import { CatalogExercise } from "./trainingApi.types";

export function getCatalog({
  client,
}: GatewayClient): Promise<CatalogExercise[]> {
  return request(client.get("/catalog-exercises"));
}
