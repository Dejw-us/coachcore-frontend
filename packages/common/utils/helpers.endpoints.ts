import {
  PathVars,
  QueryParams,
} from "../services/api/endpoints/api.endpoints.types";

export function makeEndpoint(
  endpoint: string,
  pathVars?: PathVars,
  queryParams?: QueryParams
): string {
  let url = endpoint;

  if (pathVars) {
    for (const [key, value] of Object.entries(pathVars)) {
      url = url.replace(`:${key}`, String(value));
    }
  }

  if (queryParams) {
    return `${url}${makeParams(queryParams)}`;
  }

  return url;
}

function makeParams(params: QueryParams): string {
  const stringifiedParams = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  );

  return `?${new URLSearchParams(stringifiedParams).toString()}`;
}
