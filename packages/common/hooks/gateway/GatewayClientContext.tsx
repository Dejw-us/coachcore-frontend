import { createContext } from "react";
import { GatewayClient } from "./GatewayClientProvider";

export const GatewayClientContext = createContext<GatewayClient | null>(null);
