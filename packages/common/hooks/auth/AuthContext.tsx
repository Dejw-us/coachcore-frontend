import { createContext } from "react";
import { Auth } from "./AuthProvider";

export const AuthContext = createContext<Auth | null>(null);
