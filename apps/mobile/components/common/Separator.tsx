import { View } from "react-native";

export type SeparatorProps = {
  className?: string;
};

export default function Separator({ className }: SeparatorProps) {
  return (
    <View
      className={`${className ? className : "w-full h-1 bg-slate-300"} rounded-lg`}
    />
  );
}
