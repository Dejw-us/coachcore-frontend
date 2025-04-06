import { AxiosInstance } from "axios";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type User = {
  username: string;
};

export type GatewayClientState = {
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

export type Tokens = {
  refresh_token: string;
  access_token: string;
  id_token: string;
};
