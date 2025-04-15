import { makeEndpoint } from "../../../utils/helpers.endpoints";
import { PLANS, VERSION } from "./api.endpoints.constants";
import { ApiEndpoints } from "./api.endpoints.types";

export const ENDPOINTS_PLANS_PUT: ApiEndpoints["plans"]["put"] = {
  tags: (path) => makeEndpoint(`/${VERSION}/${PLANS}:planId`, path),
};
