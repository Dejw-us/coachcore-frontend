import { GatewayClientState } from "../../hooks/gateway/GatewayClient.types";
import { request } from "../../utils/index";
import { CatalogExercise } from "./trainingApi.types";

export function getCatalog({
  client,
}: GatewayClientState): Promise<CatalogExercise[]> {
  return request(client.get("/v1/catalog-exercises"));
}
