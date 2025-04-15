import { ENDPOINTS_PLANS_DELETE } from "./api.endpoints.plans.delete";
import { ENDPOINTS_PLANS_GET } from "./api.endpoints.plans.get";
import { ENDPOINTS_PLANS_PATCH } from "./api.endpoints.plans.patch";
import { ENDPOINTS_PLANS_POST } from "./api.endpoints.plans.post";
import { ENDPOINTS_PLANS_PUT } from "./api.endpoints.plans.put";
import { ApiEndpoints } from "./api.endpoints.types";
import { ENDPOINTS_UNITS_GET } from "./api.endpoints.units.get";
import { ENDPOINTS_UNITS_POST } from "./api.endpoints.units.post";

export const ENDPOINTS: ApiEndpoints = {
  units: {
    get: ENDPOINTS_UNITS_GET,
    post: ENDPOINTS_UNITS_POST,
  },
  plans: {
    get: ENDPOINTS_PLANS_GET,
    patch: ENDPOINTS_PLANS_PATCH,
    post: ENDPOINTS_PLANS_POST,
    put: ENDPOINTS_PLANS_PUT,
    delete: ENDPOINTS_PLANS_DELETE,
  },
};
