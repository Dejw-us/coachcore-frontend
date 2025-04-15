import { makeEndpoint } from "../../../utils/helpers.endpoints";
import { PLANS, VERSION } from "./api.endpoints.constants";
import { ApiEndpoints } from "./api.endpoints.types";

export const ENDPOINTS_PLANS_PATCH: ApiEndpoints["plans"]["patch"] = {
  byId: (path) => makeEndpoint(`/${VERSION}${PLANS}/:planId`, path),
};
