import { useQuery } from "@tanstack/react-query";
import { getPublicUser } from "../../services/api";
import { publicUserKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export function usePublicUser(username: string) {
  const gatewayClient = useGatewayClient();
  return useQuery({
    queryKey: publicUserKey(username),
    queryFn: async () => await getPublicUser(gatewayClient, username),
  });
}
