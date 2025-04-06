import { useContext } from "react";
import { GatewayClientState } from "./GatewayClient.types";
import { GatewayClientContext } from "./GatewayClientContext";

export function useGatewayClient(): GatewayClientState {
  var client = useContext(GatewayClientContext);

  if (!client) {
    throw new Error("You must provice GatewayClientProvider");
  }
  return client;
}
