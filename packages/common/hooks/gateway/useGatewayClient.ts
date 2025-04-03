import { useContext } from "react";
import { GatewayClientContext } from "./GatewayClientContext";
import { GatewayClient } from "./GatewayClientProvider";

export function useGatewayClient(): GatewayClient {
  var client = useContext(GatewayClientContext);

  if (!client) {
    throw new Error("You must provice GatewayClientProvider");
  }

  return client;
}
