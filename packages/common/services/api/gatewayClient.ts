import axios from "axios";
import { AuthenticationError, DtoValidationError } from "../../utils/errors";

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
          gatewayClient.defaults.headers.common["Authorization"] =
            response.data.access_token;
          axios(error.config);
        }
      } catch {
        return Promise.reject(new AuthenticationError());
      }
    }

    return Promise.reject(error);
  }
);
