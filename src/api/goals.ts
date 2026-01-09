import type {
  GoalRunResponse,
  UpdateDayRequest,
  GoalRecommendationRequest,
  GoalRecommendationResponse,
  GoalSaveRequest,
  GoalSaveResponse,
} from "./types";

const API_BASE_URL = "http://13.124.238.240:8080/api";

export const goalsApi = {
  // GET : 챌린지 상세 조회
  getRun: async (runId: number): Promise<GoalRunResponse> => {
    const response = await fetch(`${API_BASE_URL}/progress/runs/${runId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Device-Id": "test-uuid-1234",
      },
    });

    if (!response.ok) {
      throw new Error("챌린지 조회 실패");
    }

    return response.json();
  },

  // POST : AI 목표 추천 요청
  getRecommendations: async (request: GoalRecommendationRequest): Promise<GoalRecommendationResponse> => {
    const response = await fetch(`${API_BASE_URL}/goal/ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Device-Id": "test-uuid-1234", // 명세서 필수 헤더
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("목표 추천 실패");
    }

    return response.json();
  },

  // POST : 목표 저장
  saveGoal: async (request: GoalSaveRequest): Promise<GoalSaveResponse> => {
    const response = await fetch(`${API_BASE_URL}/goal/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Device-Id": "test-uuid-1234",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("목표 저장 실패");
    }

    return response.json();
  },

  // PATCH : 하루 결과 저장
  updateDayResult: async (runId: number, dayIndex: number, data: UpdateDayRequest): Promise<GoalRunResponse> => {
    const response = await fetch(`${API_BASE_URL}/progress/runs/${runId}/days/${dayIndex}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Device-Id": "test-uuid-1234",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("하루 결과 저장 실패");
    }

    return response.json();
  },
};
