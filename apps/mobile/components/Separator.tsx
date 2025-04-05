import { View } from "react-native";

export type SeparatorProps = {
  color?: string;
  size?: number;
  width?: number;
};

export default function Separator({
  color = "slate-300",
  size = 1,
  width,
}: SeparatorProps) {
  return (
    <View
      className={`${width ? `w-${width}` : "w-full"} h-${size} bg-${color} mt-5 mb-5 rounded-lg`}
    />
  );
}
