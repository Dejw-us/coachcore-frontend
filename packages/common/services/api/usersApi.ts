import { request } from "../../utils";
import { gatewayClient } from "./gatewayClient";
import { PublicUser } from "./userApi.types";

export function getPublicUser(username: string): Promise<PublicUser> {
  return request(gatewayClient.get(`/v1/users/public/${username}`));
}
