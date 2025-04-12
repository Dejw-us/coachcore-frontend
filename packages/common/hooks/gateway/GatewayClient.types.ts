import { AxiosInstance } from "axios";
import { ReactNode } from "react";

export type User = {
  username: string;
};

export type GatewayClientState = {
  client: AxiosInstance;
  refreshToken: string | null;
  setRefreshToken: (token: string | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  idToken: string | null;
  setIdToken: (token: string | null) => void;
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

export type Tokens = {
  refresh_token: string;
  access_token: string;
  id_token: string;
};

export type JwtPayload = {
  sub: string;
};

export type TokensSetters = {
  setIdToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setAccessToken: (token: string | null) => void;
};
