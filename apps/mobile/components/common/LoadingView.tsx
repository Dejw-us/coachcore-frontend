import { ReactNode } from "react";
import { ActivityIndicator, Text } from "react-native";
import MiddleSafeAreaView from "./MiddleSafeAreaView";

export type LoadingViewProps<T> = {
  isLoading: boolean;
  data: T | null | undefined;
  render: (data: T) => ReactNode;
  renderLoading?: () => ReactNode;
  renderError?: () => ReactNode;
};

export default function LoadingView<T>({
  isLoading,
  render,
  data,
  renderLoading = () => <ActivityIndicator />,
  renderError = () => <Text>Failed to load data</Text>,
}: LoadingViewProps<T>) {
  if (isLoading) {
    console.log("Loading");
    <MiddleSafeAreaView>{renderLoading()}</MiddleSafeAreaView>;
  }
  if (!data) {
    console.log("not data");
    return <MiddleSafeAreaView>{renderError()}</MiddleSafeAreaView>;
  }
  return render(data);
}
