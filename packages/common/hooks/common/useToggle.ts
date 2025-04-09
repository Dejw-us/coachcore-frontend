import { useState } from "react";

export type Toggle = {
  toggleState: () => void;
  setState: (state: boolean) => void;
  getState: () => boolean;
};

export function useToggle(defaultValue?: boolean): Toggle {
  const [toggle, setToggle] = useState(defaultValue || false);

  return {
    toggleState: () => setToggle(!toggle),
    setState: (state: boolean) => setToggle(state),
    getState: () => toggle,
  };
}
