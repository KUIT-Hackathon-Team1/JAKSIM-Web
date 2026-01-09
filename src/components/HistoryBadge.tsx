import icDefaultBadge from "../assets/default-badge.svg";
import ProgressRing from "./ProgressRing";

interface HistoryBadgeProps {
  badge: {
    goalId: number;
    goalTitle?: string;
    category?: string;
    runStatus?: string;
  };
  relatedBadges?: {
    runId: number;
    result?: "SUCCESS" | "FAIL" | "DEFAULT" | "HALF";
  }[];
  onClick?: () => void;
}

const HistoryBadge = ({
  badge,
  relatedBadges = [],
  onClick,
}: HistoryBadgeProps) => {
  // goalId와 매칭되는 relatedBadges를 runId 순서로 정렬
  const sortedBadges =
    relatedBadges.length > 0
      ? [...relatedBadges].sort((a, b) => a.runId - b.runId)
      : [
          { runId: 1, result: "DEFAULT" as const },
          { runId: 2, result: "DEFAULT" as const },
          { runId: 3, result: "DEFAULT" as const },
        ];

  // 배지 이미지 결과 결정 (우선순위: FAIL > HALF > SUCCESS)
  const getOverallResult = () => {
    // FAIL이 하나라도 있으면 FAIL
    if (sortedBadges.some((badge) => badge.result === "FAIL")) {
      return "FAIL";
    }
    // HALF가 하나라도 있고 나머지가 SUCCESS이면 HALF
    if (sortedBadges.some((badge) => badge.result === "HALF")) {
      return "HALF";
    }
    // 모두 SUCCESS이면 SUCCESS
    if (sortedBadges.every((badge) => badge.result === "SUCCESS")) {
      return "SUCCESS";
    }
    // 그 외
    return sortedBadges[0]?.result || "DEFAULT";
  };

  const overallResult = getOverallResult();

  // category를 result와 함께 사용해서 이미지 경로 생성 (전체 결과 사용)
  const getIconPath = () => {
    const category = badge.category || "empty";
    return `/badge/${overallResult.toLowerCase()}-${category}.svg`;
  };

  const iconPath = getIconPath();
  return (
    <button
      onClick={onClick}
      className="cursor-pointer active:scale-95 transition-transform"
    >
      <div>
        <div className="relative w-[106px] h-[106px] flex items-center justify-center">
          {/* 진행 링 3개 - 각각 개별 result 유지 (FAIL 배지이어도 각 링은 원래대로) */}
          <ProgressRing result={sortedBadges[0]?.result} angle={0} />
          <ProgressRing result={sortedBadges[1]?.result} angle={120} />
          <ProgressRing result={sortedBadges[2]?.result} angle={240} />

          {/* 뱃지 배경 + 아이콘 (public/badge의 완전한 이미지 사용) */}
          <img
            src={iconPath}
            alt={badge.category || "badge icon"}
            className="absolute w-[79px] h-[76px] object-contain"
          />
        </div>
      </div>
    </button>
  );
};

export default HistoryBadge;
