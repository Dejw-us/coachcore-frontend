import { useEffect } from "react";

export function useLogError(error: Error | null, prefix = "") {
  useEffect(() => {
    if (error) {
      console.log(
        `${prefix}${prefix === "" ? "" : " | "}Error: ` + error.message
      );
    }
  }, [error]);
}
