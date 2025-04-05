import { useEffect } from "react";

export function useLogError(error: Error | null) {
  useEffect(() => {
    if (error) {
      console.log("Error: " + error.message);
    }
  }, [error]);
}
