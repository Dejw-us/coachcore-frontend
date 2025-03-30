import { ReactNode } from "react";

export type MapperProps<T> = {
  value: T[];
  render: (data: T) => ReactNode;
};

export default function Mapper<T>({ value, render }: MapperProps<T>) {
  return value.map((data) => render(data));
}
