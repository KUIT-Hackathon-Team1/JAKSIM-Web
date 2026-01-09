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

export interface UpdateDayRequest {
  result: "SUCCESS" | "PARTIAL" | "FAIL";
  memo: string;
  finalizeDay: boolean;
}

// AI 목표 추천 Request
export interface GoalRecommendationRequest {
  goalCategory: string;
  intent: string;
  baseGoalId?: number | null;
  action?: string | null;
}

// AI 목표 추천 Response
export interface GoalRecommendationResponse {
  success: boolean;
  data: string[];
  error: string | null;
}

// 목표 저장 Request
export interface GoalSaveRequest {
  goalTitle: string;
  goalCategory: string;
  intent: string;
  baseGoalId?: number | null;
  action?: string | null;
}

// 목표 저장 Response
export interface GoalSaveResponse {
  success: boolean;
  data: number; // goalId
  error: string | null;
}
