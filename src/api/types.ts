export interface GoalRunResponse {
  runId: number;
  goalId: number;
  goalTitle: string;
  category: string;
  categoryIconKey: string;
  runStatus: "IN_PROGRESS" | "COMPLETED";
  startDate: string;
  expectedEndDate: string;
  days: Array<{
    dayIndex: number;
    date: string;
    result: string;
    finalized: boolean;
  }>;
}

export interface GoalRunRequest {
  goalId: number;
  startDate: string;
}
