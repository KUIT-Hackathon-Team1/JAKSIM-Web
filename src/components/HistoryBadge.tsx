// src/components/HistoryBadge.tsx
import icProgressSuccess from "../assets/progress-success.svg";
import icDefaultBadge from "../assets/default-badge.svg";

interface HistoryBadgeProps {
  badge: {
    runId: number;
    goalTitle?: string;
    categoryIconKey?: string;
    // 추후 API 명세서에 따라 필요한 필드를 추가하세요.
  };
}

const HistoryBadge = ({ badge }: HistoryBadgeProps) => {
  return (
    <div className="relative w-[106px] h-[106px] flex items-center justify-center">
      {/* 1. 바깥쪽 성공 링 */}
      <img
        src={icProgressSuccess}
        className="absolute inset-0 w-full h-full"
        alt="success ring"
      />

      {/* 2. 안쪽 흰색 뱃지 배경 */}
      <img
        src={icDefaultBadge}
        className="absolute w-[79px] h-[76px] object-contain"
        alt="badge background"
      />

      {/* 3. 아이콘 영역 (추후 badge.categoryIconKey에 따라 동적 변경) */}
      <div className="relative z-10 w-10 h-10 flex items-center justify-center">
        {/* 예: <img src={getIconByKey(badge.categoryIconKey)} ... /> */}
      </div>
    </div>
  );
};

export default HistoryBadge;
