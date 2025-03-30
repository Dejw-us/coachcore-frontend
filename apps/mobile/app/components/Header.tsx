import { Text } from "react-native";

export type HeaderProps = {
  value: string;
  className?: string;
};

export default function Header({ value, className }: HeaderProps) {
  return <Text className={`text-4xl ${className}`}>{value}</Text>;
}
