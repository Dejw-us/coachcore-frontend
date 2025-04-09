import { Text } from "react-native";

export type PlanWeeksProps = {
  className?: string;
  weeks: number;
};

export default function PlanWeeks({ weeks, className }: PlanWeeksProps) {
  return (
    <Text className={className || ""}>
      {weeks} {weeks > 1 ? "Weeks" : "Week"}
    </Text>
  );
}
