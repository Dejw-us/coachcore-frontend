import { MutableRefObject, useEffect } from "react";
import { LOG } from "../../utils";
import { TokenStorage } from "./GatewayClient.types";

export function usePersistTokens(
  tokenStorage: TokenStorage,
  refreshToken: MutableRefObject<string | null>,
  idToken: MutableRefObject<string | null>
) {
  useEffect(() => {
    if (refreshToken.current) {
      LOG.debug("Persisting refresh token...");
      tokenStorage.persistRefreshToken(refreshToken.current);
    }
  }, [refreshToken.current]);

  useEffect(() => {
    if (idToken.current) {
      LOG.debug("Persisting id token");
      tokenStorage.persistIdToken(idToken.current);
    }
  }, [idToken.current]);
}
