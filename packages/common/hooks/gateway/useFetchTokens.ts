import axios, { AxiosRequestConfig } from "axios";
import { MutableRefObject } from "react";
import { LOG } from "../../utils";
import { OAuth2ClientCredentials, Tokens } from "./GatewayClient.types";

export function useFetchTokens(
  tokenUrl: string,
  refreshTokenRef: MutableRefObject<string | null>,
  oauth2Client: OAuth2ClientCredentials
) {
  return async function (): Promise<Tokens | null> {
    LOG.debug("Fetching tokens...");
    const refreshToken = refreshTokenRef.current;

    if (!refreshToken) {
      LOG.debug("Refresh token is null");
      return null;
    }

    const body = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };
    const clientCredentials = btoa(`${oauth2Client.id}:${oauth2Client.secret}`);

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${clientCredentials}`,
      },
    };
    const response = await axios.post(tokenUrl, body, config);

    if (response.status === 200) {
      LOG.debug("Tokens has been fetched successfully");
      return response.data;
    } else {
      LOG.debug(`Failed to fetch tokens with status ${response.status}`);
    }

    return null;
  };
}
