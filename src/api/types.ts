export interface GoalRunResponse {
  runId: number;
  goalId: number;
  goalTitle: string;
  goalIntent: string;
  category: string;
  categoryIconKey: string;
  runStatus: "IN_PROGRESS" | "COMPLETED";
  tierStatus: string | null;
  startDate: string;
  expectedEndDate: string;
  currentDayIndex: number;
  days: Array<{
    dayIndex: number;
    date: string;
    result: string;
    finalized: boolean;
    memo: string | null;
  }>;
}

export interface UpdateDayRequest {
  result: "SUCCESS" | "PARTIAL" | "FAIL";
  memo: string;
  finalizeDay: boolean;
}

export interface GoalRecommendationRequest {
  goalCategory: string;
  intent: string;
  baseGoalId?: number | null;
  action?: string | null;
}

export interface GoalRecommendationResponse {
  success: boolean;
  data: string[];
  error: string | null;
}

export interface GoalSaveRequest {
  goalTitle: string;
  goalCategory: string;
  intent: string;
  baseGoalId?: number | null;
  action?: string | null;
}

export interface GoalSaveResponse {
  success: boolean;
  data: number;
  error: string | null;
}

// 목표 수정 Request
export interface GoalUpdateRequest {
  goalTitle: string;
  intent: string;
}

// 목표 수정 Response
export interface GoalUpdateResponse {
  success: boolean;
  data: {
    id: number;
    title: string;
    category: string;
  };
  error: null;
}
