import { makeEndpoint } from "../../../utils/helpers.endpoints";
import { PLANS, PUBLIC, VERSION } from "./api.endpoints.constants";
import { ApiEndpoints } from "./api.endpoints.types";

export const ENDPOINTS_PLANS_GET: ApiEndpoints["plans"]["get"] = {
  all: () => makeEndpoint(`/${VERSION}${PUBLIC}${PLANS}`),
  byId: (path) => makeEndpoint(`/${VERSION}${PUBLIC}${PLANS}/:planId`, path),
  my: (path, params) => makeEndpoint(`/${VERSION}${PLANS}/me`, path, params),
};
