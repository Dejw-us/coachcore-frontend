import axios, { AxiosInstance } from "axios";
import { createContext, useContext } from "react";
import { AuthenticationError, DtoValidationError } from "../../utils/errors";

export type GatewayClient = {
  instance: AxiosInstance;
};

export const GatewayClientContext = createContext<GatewayClient | undefined>(
  undefined
);
export const useGatewayClient = () => {
  const context = useContext(GatewayClientContext);
  if (!context) {
    throw new Error("Gateway client must have an instance");
  }
  return context;
};

const GATEWAY = "http://10.0.2.2:8080"; // TODO add env vars
const CLIENT_CREDENTIALS = btoa("coachcore-web-app:web-app-secret"); // <-- OAuth2 client_secret_basic

export const gatewayClient = axios.create({
  baseURL: GATEWAY,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

async function refreshToken() {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${CLIENT_CREDENTIALS}`,
  };
  return axios.post(
    `${GATEWAY}/oauth2/token`,
    {},
    {
      headers,
      withCredentials: true,
    }
  );
}

gatewayClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    const status = error.response.status;
    const body = error.response.data;

    if (status === 400) {
      if (body.errorCode == "DTO_VALIDATION_ERROR") {
        return Promise.reject(new DtoValidationError(body.errors));
      }
    }
    if (status === 401 || status === 403) {
      try {
        const response = await refreshToken();
        if (response.status === 200) {
          axios(error.config);
        }
      } catch {
        return Promise.reject(new AuthenticationError());
      }
    }

    return Promise.reject(error);
  }
);
