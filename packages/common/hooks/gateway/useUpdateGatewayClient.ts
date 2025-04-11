import axios, { AxiosInstance } from "axios";
import { MutableRefObject, useEffect } from "react";
import { Tokens, TokenStorage } from "./GatewayClient.types";

export function useUpdateGatewayClient(
  client: AxiosInstance,
  refreshTokenRef: MutableRefObject<string | null>,
  accessTokenRef: MutableRefObject<string | null>,
  idTokenRef: MutableRefObject<string | null>,
  tokenStorage: TokenStorage,
  fetchTokens: () => Promise<Tokens | null>
) {
  useEffect(() => {
    if (!refreshTokenRef.current) {
      return;
    }

    const requestInterceptor = client.interceptors.request.use((request) => {
      if (accessTokenRef.current != null) {
        request.headers.Authorization = `Bearer ${accessTokenRef.current}`;
      }
      return request;
    });

    const responseInerceptor = client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (!error.response) {
          return Promise.reject(error);
        }

        const status = error.response.status;

        if (
          (status === 401 || status === 403) &&
          refreshTokenRef.current != null
        ) {
          const tokens = await fetchTokens();

          if (tokens) {
            const newIdToken = tokens.id_token;
            const newAccessToken = tokens.access_token;

            accessTokenRef.current = newAccessToken;
            idTokenRef.current = newIdToken;

            tokenStorage.persistRefreshToken(tokens.refresh_token);
            tokenStorage.persistIdToken(newIdToken);

            return axios(error.config);
          }
        }
      }
    );

    return () => {
      client.interceptors.request.eject(requestInterceptor);
      client.interceptors.request.eject(responseInerceptor);
    };
  }, [accessTokenRef.current, refreshTokenRef.current]);
}
