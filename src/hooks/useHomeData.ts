import { useState, useEffect } from "react";
import { fetchHomeData } from "../api/home";
import type { HomeResponse } from "../api/types_2";

const useHomeData = () => {
  const [data, setData] = useState<HomeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchHomeData();
        setData(result);
      } catch (err) {
        console.error("데이터 로딩 중 에러 발생:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return { data, isLoading, error };
};

export default useHomeData;

// // 1. API 명세서에 따른 인터페이스 정의
// interface Summary {
//   completedLoops: number;
//   streakDays: number;
//   achievementRate: number;
// }

// interface Badge {
//   runId: number;
//   goalId: number;
//   goalTitle: string;
//   category: string;
//   runStatus: string;
//   tierStatus: string | null;
//   startDate: string;
//   expectedEndDate: string;
//   endedAt: string | null;
//   result?: "SUCCESS" | "FAIL" | "DEFAULT" | "HALF";
// }

// interface HomeResponse {
//   summary: Summary;
//   hasInProgress: boolean;
//   newGoalIconKey: string;
//   badges: Badge[];
// }

// const useHomeData = () => {
//   // 초기 상태값
//   const [data, setData] = useState<HomeResponse>({
//     summary: {
//       completedLoops: 0,
//       streakDays: 0,
//       achievementRate: 0,
//     },
//     hasInProgress: false,
//     newGoalIconKey: "star",
//     badges: [],
//   });

//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // TODO: 실제 API 호출 시 이 부분을 fetch/axios로 변경 필요.
//     const badges = [
//       // 목표 1: SUCCESS 배지 (모두 SUCCESS) - goalId: 10
//       {
//         runId: 1,
//         goalId: 10,
//         goalTitle: "아침 운동",
//         category: "weight",
//         runStatus: "COMPLETED",
//         tierStatus: "GOLD",
//         startDate: "2026-01-07",
//         expectedEndDate: "2026-01-09",
//         endedAt: "2026-01-09",
//         result: "SUCCESS" as const,
//       },
//       {
//         runId: 2,
//         goalId: 10,
//         goalTitle: "아침 운동",
//         category: "weight",
//         runStatus: "COMPLETED",
//         tierStatus: "GOLD",
//         startDate: "2026-01-07",
//         expectedEndDate: "2026-01-09",
//         endedAt: "2026-01-09",
//         result: "SUCCESS" as const,
//       },
//       {
//         runId: 3,
//         goalId: 10,
//         goalTitle: "아침 운동",
//         category: "weight",
//         runStatus: "COMPLETED",
//         tierStatus: "GOLD",
//         startDate: "2026-01-07",
//         expectedEndDate: "2026-01-09",
//         endedAt: "2026-01-09",
//         result: "SUCCESS" as const,
//       },
//       // 목표 2: HALF 배지 (HALF 하나, 나머지 SUCCESS) - goalId: 8
//       {
//         runId: 1,
//         goalId: 8,
//         goalTitle: "명상하기",
//         category: "health",
//         runStatus: "COMPLETED",
//         tierStatus: "SILVER",
//         startDate: "2026-01-04",
//         expectedEndDate: "2026-01-06",
//         endedAt: "2026-01-06",
//         result: "SUCCESS" as const,
//       },
//       {
//         runId: 2,
//         goalId: 8,
//         goalTitle: "명상하기",
//         category: "health",
//         runStatus: "COMPLETED",
//         tierStatus: "SILVER",
//         startDate: "2026-01-04",
//         expectedEndDate: "2026-01-06",
//         endedAt: "2026-01-06",
//         result: "HALF" as const,
//       },
//       {
//         runId: 3,
//         goalId: 8,
//         goalTitle: "명상하기",
//         category: "health",
//         runStatus: "COMPLETED",
//         tierStatus: "SILVER",
//         startDate: "2026-01-04",
//         expectedEndDate: "2026-01-06",
//         endedAt: "2026-01-06",
//         result: "SUCCESS" as const,
//       },
//       // 목표 3: FAIL 배지 (runId 2에서 FAIL → runId 3 없음) - goalId: 5
//       {
//         runId: 1,
//         goalId: 5,
//         goalTitle: "물 마시기",
//         category: "health",
//         runStatus: "COMPLETED",
//         tierStatus: null,
//         startDate: "2026-01-01",
//         expectedEndDate: "2026-01-03",
//         endedAt: "2026-01-02",
//         result: "SUCCESS" as const,
//       },
//       {
//         runId: 2,
//         goalId: 5,
//         goalTitle: "물 마시기",
//         category: "health",
//         runStatus: "COMPLETED",
//         tierStatus: null,
//         startDate: "2026-01-01",
//         expectedEndDate: "2026-01-03",
//         endedAt: "2026-01-02",
//         result: "FAIL" as const,
//       },
//       // 목표 4: 진행중 - runId 1,2만 있음, 서로 다른 result로 각 링 색칠 - goalId: 12
//       {
//         runId: 1,
//         goalId: 12,
//         goalTitle: "책 읽기",
//         category: "language",
//         runStatus: "IN_PROGRESS",
//         tierStatus: null,
//         startDate: "2026-01-09",
//         expectedEndDate: "2026-01-11",
//         endedAt: null,
//         result: "SUCCESS" as const,
//       },
//       {
//         runId: 2,
//         goalId: 12,
//         goalTitle: "책 읽기",
//         category: "language",
//         runStatus: "IN_PROGRESS",
//         tierStatus: null,
//         startDate: "2026-01-09",
//         expectedEndDate: "2026-01-11",
//         endedAt: null,
//         result: "SUCCESS" as const,
//       },
//     ];

//     // goalId별로 runId 개수 계산
//     const goalRunCounts = new Map<number, number>();
//     badges.forEach((badge) => {
//       goalRunCounts.set(
//         badge.goalId,
//         (goalRunCounts.get(badge.goalId) || 0) + 1
//       );
//     });

//     // runId가 1,2,3이 다 있지 않은 경우가 하나라도 있으면 hasInProgress = true
//     const hasInProgress = Array.from(goalRunCounts.values()).some(
//       (count) => count < 3
//     );

//     const mockResponse: HomeResponse = {
//       summary: {
//         completedLoops: 4,
//         streakDays: 6,
//         achievementRate: 80,
//       },
//       hasInProgress,
//       newGoalIconKey: "star",
//       badges,
//     };

//     // 데이터를 가져오는 시뮬레이션
//     const timer = setTimeout(() => {
//       setData(mockResponse);
//       setIsLoading(false);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, []);

//   return { data, isLoading };
// };

// export default useHomeData;
