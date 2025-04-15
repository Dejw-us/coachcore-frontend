import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useGatewayClient } from "../gateway";
import { GatewayClientState } from "../gateway/GatewayClient.types";

export type Clients = {
  gatewayClient: GatewayClientState;
  queryClient: QueryClient;
};

export function useClients(): Clients {
  const gatewayClient = useGatewayClient();
  const queryClient = useQueryClient();

  return { gatewayClient, queryClient };
}
