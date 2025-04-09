import { ReactNode } from "react";
import { View } from "react-native";

export type CenterViewProps = {
  children: ReactNode;
  className?: string;
};

export default function CenterView({ children, className }: CenterViewProps) {
  return (
    <View className="w-full">
      <View
        className={`rounded-lg ${className ? className : "p-10 m-2.5"} bg-white flex flex-col`}
      >
        {children}
      </View>
    </View>
  );
}
