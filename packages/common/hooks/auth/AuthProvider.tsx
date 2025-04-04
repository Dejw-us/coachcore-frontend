import { jwtDecode } from "jwt-decode";
import React, { Dispatch, useEffect, useState } from "react";
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
};

export function AuthProvider({ children, restoreIdToken }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);

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
        setUser({ username: jwt.sub! });
      } else {
        setUser(null);
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
