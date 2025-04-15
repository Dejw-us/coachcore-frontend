import { makeEndpoint } from "../../../utils/helpers.endpoints";
import { PLANS, VERSION } from "./api.endpoints.constants";
import { ApiEndpoints } from "./api.endpoints.types";

export const ENDPOINTS_PLANS_POST: ApiEndpoints["plans"]["post"] = {
  plan: () => makeEndpoint(`/${VERSION}${PLANS}`),
  saveById: (path, params) =>
    makeEndpoint(`/${VERSION}/saved-plans`, path, params),
};
