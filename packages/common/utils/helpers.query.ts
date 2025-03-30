import { InvalidateQueryFilters, QueryClient } from "@tanstack/react-query";

export const planKey = (planId: string) => ["plan", planId];
export const allPlansKey = () => ["allPlans"];
export const allUserPlanKey = () => ["userAllPlans"];
export const setKey = (setId: string) => ["set", setId];
export const unitKey = (unitId: string) => ["unit", unitId];
export const planUnitsKey = (planId: string) => ["units", planId];
export const exercisesKey = (planId: string, unitId: string) => [
  "exercises",
  planId,
  unitId,
];
export const setsKey = (planId: string, exerciseId: string) => [
  "sets",
  planId,
  exerciseId,
];
export const unitDisplayKey = (unitId: string) => ["unitDisplay", unitId];

export function filterAndAddQueryData<T>(
  client: QueryClient,
  key: string[],
  filter: (data: T) => boolean,
  data: T
) {
  client.setQueryData(key, (oldData: T[] | undefined) => {
    return updateOldData(oldData, (old) => {
      const filtered = old.filter(filter);
      return [...filtered, data];
    });
  });
}

export function filterQueryData<T>(
  client: QueryClient,
  key: string[],
  filter: (data: T) => boolean
) {
  client.setQueryData(key, (oldData: T[] | undefined) => {
    return updateOldData(oldData, (old) => old.filter(filter));
  });
}

export function addQueryData<T>(client: QueryClient, key: string[], data: T) {
  client.setQueryData(key, (old: T[] | undefined) => {
    return updateOldData(old, (oldData) => [...oldData, data]);
  });
}

export function invalidateQueries(
  client: QueryClient,
  key: string[]
): Promise<void> {
  return client.invalidateQueries(createOptions(key));
}

export function createOptions(key: string[]): InvalidateQueryFilters {
  return {
    queryKey: key,
  };
}

export function filterId(objectWithId: { id: string }) {
  return (data: { id: string }) => data.id !== objectWithId.id;
}

function updateOldData<T>(
  oldData: T[] | undefined,
  updater: (oldData: T[]) => T[]
): T[] {
  if (!oldData) {
    return [];
  }
  return updater(oldData);
}
