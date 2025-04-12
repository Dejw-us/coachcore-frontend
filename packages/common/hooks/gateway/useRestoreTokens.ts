import { useEffect } from "react";
import { LOG } from "../../utils";
import { TokenStorage } from "./GatewayClient.types";

export function useRestoreTokens(
  tokenStorage: TokenStorage,
  setRefreshToken: (token: string | null) => void,
  setIdToken: (token: string | null) => void
) {
  useEffect(() => {
    const restore = async () => {
      LOG.debug("Restoring tokens...");
      const newRefreshToken = await tokenStorage.restoreRefreshToken();
      const newIdToken = await tokenStorage.restoreIdToken();

      LOG.debug(`Refresh token: ${newRefreshToken}`);
      LOG.debug(`Id token: ${newIdToken}`);

      setRefreshToken(newRefreshToken);
      setIdToken(newIdToken);
    };
    restore();
  }, [tokenStorage]);
}
