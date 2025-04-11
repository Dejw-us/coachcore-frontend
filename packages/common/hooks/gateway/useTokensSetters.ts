import { jwtDecode } from "jwt-decode";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { LOG } from "../../utils";
import {
  JwtPayload,
  TokensSetters,
  TokenStorage,
  User,
} from "./GatewayClient.types";

export function useTokensSetters(
  tokenStorage: TokenStorage,
  setUser: Dispatch<SetStateAction<User | null>>,
  idTokenRef: MutableRefObject<string | null>,
  refreshTokenRef: MutableRefObject<string | null>,
  accessTokenRef: MutableRefObject<string | null>
): TokensSetters {
  const setIdToken = (token: string | null) => {
    idTokenRef.current = token;
    if (token) {
      LOG.debug("Persisting id token", token);
      tokenStorage.persistIdToken(token);
      LOG.debug("Updating user...");
      const jwt = jwtDecode<JwtPayload>(token);
      const user: User = {
        username: jwt.sub,
      };
      LOG.debug("Setting user to", JSON.stringify(user));
      setUser(user);
      LOG.debug("Setting user to null");
    } else {
      setUser(null);
      LOG.debug("Id token is null");
    }
  };

  const setAccessToken = (token: string | null) => {
    accessTokenRef.current = token;
  };
  const setRefreshToken = (token: string | null) => {
    refreshTokenRef.current = token;
    if (token) {
      tokenStorage.persistRefreshToken(token);
    }
  };

  return {
    setIdToken,
    setRefreshToken,
    setAccessToken,
  };
}
