import { makeEndpoint } from "../../../utils/helpers.endpoints";
import { PLANS, PUBLIC, VERSION } from "./api.endpoints.constants";
import { ApiEndpoints } from "./api.endpoints.types";

export const ENDPOINTS_UNITS_GET: ApiEndpoints["units"]["get"] = {
  allByPlanId: (path) =>
    makeEndpoint(`/${VERSION}${PUBLIC}${PLANS}/:planId/units`, path),
};
