import { makeEndpoint } from "../../../utils/helpers.endpoints";
import { PLANS, VERSION } from "./api.endpoints.constants";
import { ApiEndpoints } from "./api.endpoints.types";

export const ENDPOINTS_UNITS_POST: ApiEndpoints["units"]["post"] = {
  byId: (path) => makeEndpoint(`/${VERSION}${PLANS}/:planId/units`, path),
};
