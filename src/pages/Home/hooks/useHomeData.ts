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
  // 초기 상태값을 명세서 기본값으로 설정
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
    // TODO: 실제 API 호출 시 이 부분을 fetch/axios로 변경하세요.
    // 현재는 명세서의 샘플 데이터를 Mock 데이터로 세팅합니다.
    const mockResponse: HomeResponse = {
      summary: {
        completedLoops: 0,
        streakDays: 0,
        achievementRate: 0,
      },
      hasInProgress: false,
      newGoalIconKey: "star",
      badges: [
        // 테스트 4개
        // {
        //   runId: 1,
        //   goalId: 10,
        //   goalTitle: "하루 10분 스트레칭",
        //   category: "EXERCISE",
        //   categoryIconKey: "weight",
        //   runStatus: "IN_PROGRESS",
        //   tierStatus: null,
        //   startDate: "2026-01-09",
        //   expectedEndDate: "2026-01-11",
        //   endedAt: null,
        // },
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
