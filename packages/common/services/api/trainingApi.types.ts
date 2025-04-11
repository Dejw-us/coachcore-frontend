export type TrainingPlan = {
  id: string;
  createdBy: string;
  name: string;
  description: string;
  weeks: number;
  goals: TrainingGoal[];
  users: number;
  tags: string[];
};

export type TrainingGoal = {
  id: string;
  description: string;
};

export type CreateTrainingPlan = {
  name: string;
  description: string;
  goals: string[];
};

export type TrainingExercise = {
  id: string;
  catalogExercise: CatalogExercise;
  notes: string;
  intensityType: "RPE" | "RIR";
  weightType: "KG" | "LBS";
  index: number;
};

export type PlanPatch = {
  name?: string;
  description?: string;
};

export type ExercisePatch = {
  catalogExerciseId?: string;
  notes?: string;
  weightType?: WeightType;
  intensityType?: IntensityType;
};

export type TrainingSet = {
  id: string;
  reps: number;
  intensity: number;
  intensityType: "RPE" | "RIR";
  rate: string;
  restSeconds: number;
  weight: number;
  weightType: "KG" | "LBS";
  index: number;
};

export type TrainingSetPatch = {
  reps: number;
  intensity: number;
  intensityType: "RIR" | "RPE";
  rate: string;
  restSeconds: number;
  weight: number;
  weightType: "KG" | "LBS";
};

export type WeightType = "KG" | "LBS";

export type IntensityType = "RPE" | "RIR";

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"
  | "";

export type TrainingUnit = {
  id: string;
  name: string;
  notes: string;
  index: number;
  dayOfWeek: DayOfWeek;
};

export type TrainingUnitPreview = {
  id: string;
  name: string;
  dayOfWeek: DayOfWeek;
};

export type CreateTrainingUnit = {
  dayOfWeek: DayOfWeek;
  notes: string;
  name: string;
};

export type SavedPlan = {
  userId: string;
  savedPlan: TrainingPlan;
};

export type TrainingPlanTr = {
  trainingDays: number;
  restDays: number;
};

export type UnitDisplayPatch = {
  updater: "RATE" | "INTENSITY" | "WEIGHT";
  display: boolean;
};

export type TrainingPlanRating = {
  stars: 0 | 1 | 2 | 3 | 4 | 5;
};

export type UnitDisplay = {
  displayIntensity: boolean;
  displayWeight: boolean;
  displayRate: boolean;
};

export type CatalogExercise = {
  id: string;
  name: string;
  category: ExerciseCategory;
};

export type ExerciseCategory = {
  id: string;
  name: string;
  description: string;
};
