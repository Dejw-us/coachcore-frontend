import { request } from "../../utils";
import { client } from "./gatewayClient";
import { PublicUser } from "./userApi.types";

export function getPublicUser(username: string): Promise<PublicUser> {
  return request(client.get(`/v1/users/public/${username}`));
}
