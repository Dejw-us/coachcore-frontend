import { GatewayClient } from "../../hooks";
import { request } from "../../utils";
import { PublicUser } from "./userApi.types";

export function getPublicUser(
  { client }: GatewayClient,
  username: string
): Promise<PublicUser> {
  return request(client.get(`/v1/users/public/${username}`));
}
