import { jwtDecode } from "jwt-decode";
import React, { Dispatch, useEffect, useState } from "react";
import { useGatewayClient } from "../gateway";
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
  restoreIdToken: () => Promise<string | null>;
  clearAuth?: () => void;
};

export function AuthProvider({
  children,
  restoreIdToken,
  clearAuth,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const { client } = useGatewayClient();
  useEffect(() => {
    const restore = async () => {
      const token = await restoreIdToken();
      setIdToken(token);
    };
    restore();
  }, [restoreIdToken]);

  useEffect(() => {
    const restore = async () => {
      if (idToken != null) {
        const jwt = jwtDecode(idToken);
        const response = await client.get("/v1/users/me");
        if (response.status === 200) {
          setUser({ username: jwt.sub! });
          return;
        }
      }
      setUser(null);
      if (clearAuth) {
        clearAuth();
      }
    };
    restore();
  }, [idToken]);

  return (
    <AuthContext.Provider value={{ user, setIdToken }}>
      {children}
    </AuthContext.Provider>
  );
}
