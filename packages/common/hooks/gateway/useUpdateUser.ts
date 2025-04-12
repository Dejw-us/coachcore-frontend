import { jwtDecode } from "jwt-decode";
import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";
import { LOG } from "../../utils";
import { User } from "./GatewayClient.types";

type JwtPayload = {
  sub: string;
};

export function useUpdateUser(
  idTokenRef: MutableRefObject<string | null>,
  setUser: Dispatch<SetStateAction<User | null>>
) {
  useEffect(() => {
    LOG.debug("Updating user...");
    if (idTokenRef.current != null) {
      const jwt = jwtDecode<JwtPayload>(idTokenRef.current);
      const user: User = {
        username: jwt.sub,
      };
      LOG.debug("Setting user to", JSON.stringify(user));
      setUser(user);
    } else {
      LOG.debug("Setting user to null");
      setUser(null);
    }
  }, [idTokenRef.current]);
}
