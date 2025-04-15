import { makeEndpoint } from "../../../utils/helpers.endpoints";
import { PLANS, VERSION } from "./api.endpoints.constants";
import { ApiEndpoints } from "./api.endpoints.types";

export const ENDPOINTS_PLANS_DELETE: ApiEndpoints["plans"]["delete"] = {
  plan: (path) => makeEndpoint(`/${VERSION}${PLANS}/:planId`, path),
  tag: (path) => makeEndpoint(`/${VERSION}${PLANS}/:planId/tags`, path),
};
