import { GatewayClientState } from "../../hooks/gateway/GatewayClient.types";
import { request } from "../../utils";
import { PublicUser } from "./userApi.types";

export function getPublicUser(
  { client }: GatewayClientState,
  username: string
): Promise<PublicUser> {
  return request(client.get(`/v1/users/public/${username}`));
}
