import { useQuery } from "@tanstack/react-query";
import { getPublicUser } from "../../services/api";
import { publicUserKey } from "../../utils";

export function usePublicUser(username: string) {
  return useQuery({
    queryKey: publicUserKey(username),
    queryFn: async () => await getPublicUser(username),
  });
}
