export type RunStatus = "IN_PROCESS" | "ENDED";
export type TierStatus = "GOLD" | "BRONZE" | "FAIL" | null;
export type DayResult = "NOT_SET" | "DONE" | "PARTIAL" | "FAIL";

export interface Badge {
  runId: number;
  goalId: number;
  goalTitle: string;
  category: string;
  categoryIconKey: string;
  runStatus: "IN_PROGRESS" | "SUCCESS" | "FAIL";
  tierStatus: string | null;
  startDate: string;
  expectedEndDate: string;
  endedAt: string | null;
}

export interface HomeResponse {
  summary: {
    completedLoops: number;
    streakDays: number;
    achievementRate: number;
  };
  hasInProgress: boolean;
  newGoalIconKey: string;
  badges: Badge[];
}
