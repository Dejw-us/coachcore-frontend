import { useQuery } from "@tanstack/react-query";
import { getCatalog } from "../../services/api";
import { useGatewayClient } from "../gateway";

export default function useCatalog() {
  const client = useGatewayClient();

  return useQuery({
    queryKey: ["catalog"],
    queryFn: () => getCatalog(client),
  });
}
