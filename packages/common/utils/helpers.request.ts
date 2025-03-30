import { AxiosResponse } from "axios";

export function request<V>(request: Promise<AxiosResponse<V>>): Promise<V> {
  return request
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
}
