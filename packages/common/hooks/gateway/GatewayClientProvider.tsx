import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { GatewayClientContext } from "./GatewayClientContext";

export type User = {
  username: string;
};

export type GatewayClient = {
  client: AxiosInstance;
  refreshToken: string | null;
  setRefreshToken: Dispatch<SetStateAction<string | null>>;
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  idToken: string | null;
  setIdToken: Dispatch<SetStateAction<string | null>>;
  user: User | null;
};

export type TokenStorage = {
  persistRefreshToken: (token: string) => void;
  restoreRefreshToken: () => Promise<string | null>;
  clearRefreshToken: () => void;
  persistIdToken: (token: string) => void;
  restoreIdToken: () => Promise<string | null>;
  clearIdToken: () => void;
};

export type Urls = {
  token: string;
  gateway: string;
};

export type OAuth2ClientCredentials = {
  id: string;
  secret: string;
};

export type GatewayClientProviderProps = {
  children: ReactNode;
  tokenStorage: TokenStorage;
  urls: Urls;
  oauth2Client: OAuth2ClientCredentials;
};

const GatewayClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_GATEWAY_URL!,
  headers: {
    "Content-Type": "application/json",
  },
});

export function GatewayClientProvider({
  children,
  tokenStorage,
  urls,
  oauth2Client,
}: GatewayClientProviderProps) {
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const restore = async () => {
      console.log("Restoring tokens...");
      const newRefreshToken = await tokenStorage.restoreRefreshToken();
      const newIdToken = await tokenStorage.restoreIdToken();
      console.log("Restored id token: " + newIdToken);
      console.log("Restored refresh token: " + newRefreshToken);
      setRefreshToken(newRefreshToken);
      setIdToken(newIdToken);
    };
    restore();
  }, [tokenStorage]);

  useEffect(() => {
    if (refreshToken) {
      tokenStorage.persistRefreshToken(refreshToken);
    }
  }, [refreshToken]);

  useEffect(() => {
    if (idToken) {
      tokenStorage.persistIdToken(idToken);
    }
  }, [idToken]);

  useEffect(() => {
    const requestInterceptor = GatewayClient.interceptors.request.use(
      (request) => {
        if (accessToken != null) {
          request.headers.Authorization = `Bearer ${accessToken}`;
        }
        return request;
      }
    );

    const responseInerceptor = GatewayClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (!error.response) {
          return Promise.reject(error);
        }

        const status = error.response.status;

        if ((status === 401 || status === 403) && refreshToken != null) {
          const body = {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
          };
          const clientCredentials = Buffer.from(
            `${oauth2Client.id}:${oauth2Client.secret}`
          ).toString("base64");

          const config: AxiosRequestConfig = {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${clientCredentials}`,
            },
          };

          const response = await axios.post(urls.token, body, config); // tries to refresh token

          if (response.status === 200) {
            const data = response.data;
            const newIdToken = data.id_token;
            const newAccessToken = data.access_token;

            setAccessToken(newAccessToken);
            setIdToken(newIdToken);

            tokenStorage.persistRefreshToken(data.refresh_token);
            tokenStorage.persistIdToken(data.id_token);
            return axios(error.config);
          }
        }
      }
    );

    return () => {
      GatewayClient.interceptors.request.eject(requestInterceptor);
      GatewayClient.interceptors.request.eject(responseInerceptor);
    };
  }, [accessToken, refreshToken, setAccessToken, setIdToken]);

  useEffect(() => {
    if (idToken != null) {
      const jwt = jwtDecode(idToken);
      const user: User = {
        username: jwt.sub!,
      };
      setUser(user);
    } else {
      setUser(null);
    }
  }, [idToken]);

  return (
    <GatewayClientContext.Provider
      value={{
        client: GatewayClient,
        refreshToken,
        accessToken,
        idToken,
        user,
        setAccessToken,
        setIdToken,
        setRefreshToken,
      }}
    >
      {children}
    </GatewayClientContext.Provider>
  );
}
