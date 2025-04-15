export type PathVars = Record<string, number | string> | undefined;
export type QueryParams = Record<string, number | string | boolean> | undefined;
export type ApiEndpoint<
  P extends PathVars = undefined,
  Q extends QueryParams = undefined,
> = (pathVars: P, queryParams: Q) => string;

export type ApiEndpoints = {
  units: {
    get: {
      allByPlanId: ApiEndpoint<{ planId: string }>;
    };
    post: {
      byId: ApiEndpoint<{ planId: string }>;
    };
  };
  plans: {
    get: {
      all: ApiEndpoint;
      my: ApiEndpoint<
        undefined,
        { my: boolean; used: boolean; saved: boolean }
      >;
      byId: ApiEndpoint<{ planId: string }>;
    };
    patch: {
      byId: ApiEndpoint<{ planId: string }>;
    };
    post: {
      plan: ApiEndpoint;
      saveById: ApiEndpoint<undefined, { plandId: string }>;
    };
    delete: {
      plan: ApiEndpoint<{ planId: string }>;
      tag: ApiEndpoint<{ planId: string }>;
    };
    put: {
      tags: ApiEndpoint<{ planId: string }>;
    };
  };
};
