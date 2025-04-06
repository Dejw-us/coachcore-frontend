import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export type MiddleSafeAreaViewProps = {
  children: ReactNode;
};

export default function MiddleSafeAreaView({
  children,
}: MiddleSafeAreaViewProps) {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      {children}
    </SafeAreaView>
  );
}
