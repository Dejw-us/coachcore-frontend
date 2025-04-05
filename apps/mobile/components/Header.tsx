import { Text } from "react-native";

export type HeaderProps = {
  size?: "small" | "medium" | "big" | "large";
  value: string;
  className?: string;
};

export default function Header({
  value,
  className,
  size = "medium",
}: HeaderProps) {
  const sizeClass = {
    small: "text-xl",
    medium: "text-2xl",
    big: "text-3xl",
    large: "text-4xl",
  }[size];
  return <Text className={`${sizeClass} ${className}`}>{value}</Text>;
}
