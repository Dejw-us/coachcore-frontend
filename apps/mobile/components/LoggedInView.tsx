import { useOAuth2Client } from "@/hooks/useOAuth2Client";
import { useGatewayClient } from "common";
import { ReactNode } from "react";
import { Text } from "react-native";
import MiddleSafeAreaView from "./MiddleSafeAreaView";

export type LoggedInViewProps = {
  children: ReactNode;
};

export default function LoggedInView({ children }: LoggedInViewProps) {
  const { user } = useGatewayClient();
  const { login } = useOAuth2Client();

  return user ? (
    children
  ) : (
    <MiddleSafeAreaView>
      <Text onPress={async () => await login()}>Click here to login</Text>
    </MiddleSafeAreaView>
  );
}
