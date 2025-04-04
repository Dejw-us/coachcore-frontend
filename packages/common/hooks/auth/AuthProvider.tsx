import { jwtDecode } from "jwt-decode";
import React, { Dispatch, useEffect, useState } from "react";
import { TokenStorage, useGatewayClient } from "../gateway";
import { AuthContext } from "./AuthContext";

export type User = {
  username: string;
};

export type Auth = {
  user: User | null;
  setIdToken: Dispatch<React.SetStateAction<string | null>>;
};

export type AuthProviderProps = {
  children: React.ReactNode;
  tokenStorage: TokenStorage;
  clearAuth?: () => void;
};

export function AuthProvider({
  children,
  tokenStorage,
  clearAuth,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const { client } = useGatewayClient();
  const [isRestoring, setRestoring] = useState(true);
  useEffect(() => {
    setRestoring(true);
    const restore = async () => {
      const token = await tokenStorage.restoreIdToken();
      console.log("restoring id token: " + token);
      setIdToken(token);
      setRestoring(false);
    };
    restore();
  }, [tokenStorage.restoreIdToken]);

  useEffect(() => {
    if (isRestoring) {
      console.log("restoring");
      return;
    }
    const restore = async () => {
      if (idToken != null) {
        const jwt = jwtDecode(idToken);
        const response = await client.get("/v1/users/me");
        if (response.status === 200) {
          console.log("Udpdateing auth");
          setUser({ username: jwt.sub! });
          return;
        }
      } else {
        console.log("id token == null");
      }
      console.log("Clearing auth");
      setUser(null);
      if (clearAuth) {
        clearAuth();
      }
    };
    restore();
  }, [idToken, isRestoring]);

  return (
    <AuthContext.Provider value={{ user, setIdToken }}>
      {children}
    </AuthContext.Provider>
  );
}
