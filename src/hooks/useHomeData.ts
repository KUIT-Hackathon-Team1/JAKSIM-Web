import { useState, useEffect } from "react";

// 1. API 명세서에 따른 인터페이스 정의
interface Summary {
  completedLoops: number;
  streakDays: number;
  achievementRate: number;
}

interface Badge {
  runId: number;
  goalId: number;
  goalTitle: string;
  category: string;
  categoryIconKey: string;
  runStatus: string;
  tierStatus: string | null;
  startDate: string;
  expectedEndDate: string;
  endedAt: string | null;
  result?: "SUCCESS" | "FAIL" | "DEFAULT" | "HALF";
  memo?: string;
}

interface HomeResponse {
  summary: Summary;
  hasInProgress: boolean;
  newGoalIconKey: string;
  badges: Badge[];
}

const useHomeData = () => {
  // 초기 상태값
  const [data, setData] = useState<HomeResponse>({
    summary: {
      completedLoops: 0,
      streakDays: 0,
      achievementRate: 0,
    },
    hasInProgress: false,
    newGoalIconKey: "star",
    badges: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: 실제 API 호출 시 이 부분을 fetch/axios로 변경 필요.
    const mockResponse: HomeResponse = {
      summary: {
        completedLoops: 4,
        streakDays: 6,
        achievementRate: 80,
      },
      hasInProgress: true,
      newGoalIconKey: "star",
      badges: [
        {
          runId: 1,
          goalId: 10,
          goalTitle: "하루 10분 스트레칭",
          category: "EXERCISE",
          categoryIconKey: "weight",
          runStatus: "IN_PROGRESS",
          tierStatus: null,
          startDate: "2026-01-09",
          expectedEndDate: "2026-01-11",
          endedAt: null,
        },
        {
          runId: 2,
          goalId: 8,
          goalTitle: "아침 명상",
          category: "MINDFULNESS",
          categoryIconKey: "meditation",
          runStatus: "COMPLETED",
          tierStatus: "GOLD",
          startDate: "2026-01-06",
          expectedEndDate: "2026-01-08",
          endedAt: "2026-01-08",
          result: "SUCCESS",
          memo: "완벽한 3일 달성!",
        },
        {
          runId: 3,
          goalId: 5,
          goalTitle: "하루 2리터 물 마시기",
          category: "HEALTH",
          categoryIconKey: "water",
          runStatus: "COMPLETED",
          tierStatus: "SILVER",
          startDate: "2026-01-03",
          expectedEndDate: "2026-01-05",
          endedAt: "2026-01-05",
          result: "HALF",
          memo: "2일만 성공",
        },
        {
          runId: 4,
          goalId: 12,
          goalTitle: "독서 30분",
          category: "LEARNING",
          categoryIconKey: "book",
          runStatus: "COMPLETED",
          tierStatus: null,
          startDate: "2025-12-31",
          expectedEndDate: "2026-01-02",
          endedAt: "2026-01-01",
          result: "FAIL",
          memo: "중단됨",
        },
      ],
    };

    // 데이터를 가져오는 시뮬레이션
    const timer = setTimeout(() => {
      setData(mockResponse);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading };
};

export default useHomeData;
