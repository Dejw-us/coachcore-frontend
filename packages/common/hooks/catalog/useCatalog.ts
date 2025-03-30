import { useQuery } from "@tanstack/react-query";
import { getCatalog } from "../../services/api";

export default function useCatalog() {
  return useQuery({
    queryKey: ["catalog"],
    queryFn: getCatalog,
  });
}
