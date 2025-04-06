import { createContext } from "react";
import { GatewayClientState } from "./GatewayClient.types";

export const GatewayClientContext = createContext<GatewayClientState | null>(
  null
);
