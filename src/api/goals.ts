import type { GoalRunResponse } from "./types";

const API_BASE_URL = "http://13.124.238.240:8080";

export const goalsApi = {
  // GET : 챌린지 상세 조회
  getRun: async (runId: number): Promise<GoalRunResponse> => {
    const response = await fetch(`${API_BASE_URL}/progress/runs/${runId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("챌린지 조회 실패");
    }

    return response.json();
  },
};
