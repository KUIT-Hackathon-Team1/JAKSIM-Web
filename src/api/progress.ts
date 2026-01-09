// src/api/progress.ts
const API_BASE_URL = "http://13.124.238.240:8080/api";
const DEVICE_ID = "test-uuid-1234";

export const progressApi = {
  // 3일 챌린지 시작 (POST /api/progress/runs)
  startChallenge: async (goalId: number) => {
    const response = await fetch(`${API_BASE_URL}/progress/runs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Device-Id": DEVICE_ID,
      },
      body: JSON.stringify({ goalId }),
    });
    if (!response.ok) throw new Error("챌린지 시작 실패");
    return response.json();
  },

  // 챌린지 상세 조회 (GET /api/progress/runs/{runId})
  getChallengeDetail: async (runId: number) => {
    const response = await fetch(`${API_BASE_URL}/progress/runs/${runId}`, {
      method: "GET",
      headers: {
        "X-Device-Id": DEVICE_ID,
      },
    });
    if (!response.ok) throw new Error("상세 조회 실패");
    return response.json();
  },

  // n일차 업데이트 (PATCH /api/progress/runs/{runId}/days/{dayIndex})
  updateDay: async (
    runId: number,
    dayIndex: number,
    data: { content: string; isCompleted: boolean }
  ) => {
    const response = await fetch(
      `${API_BASE_URL}/progress/runs/${runId}/days/${dayIndex}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-Device-Id": DEVICE_ID,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) throw new Error("데이터 업데이트 실패");
    return response.json();
  },

  // 포기하기 (POST /api/progress/runs/{runId}/give-up)
  giveUpChallenge: async (runId: number) => {
    const response = await fetch(
      `${API_BASE_URL}/progress/runs/${runId}/give-up`,
      {
        method: "POST",
        headers: {
          "X-Device-Id": DEVICE_ID,
        },
      }
    );
    if (!response.ok) throw new Error("포기 처리 실패");
    return response.json();
  },
};
