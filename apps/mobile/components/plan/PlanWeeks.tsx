import { Text } from "react-native";

export type PlanWeeksProps = {
  weeks: number;
};

export default function PlanWeeks({ weeks }: PlanWeeksProps) {
  return (
    <Text>
      {weeks} {weeks > 1 ? "Weeks" : "Week"}
    </Text>
  );
}
