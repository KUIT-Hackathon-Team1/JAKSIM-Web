import icDefaultBadge from "../assets/default-badge.svg";
import ProgressRing from "./ProgressRing";

interface HistoryBadgeProps {
  badge: {
    runId: number;
    goalTitle?: string;
    categoryIconKey?: string;
    result?: "SUCCESS" | "FAIL" | "DEFAULT" | "HALF";
    memo?: string;
  };
}

const HistoryBadge = ({ badge }: HistoryBadgeProps) => {
  return (
    <div>
      <div className="relative w-[106px] h-[106px] flex items-center justify-center">
        {/* 진행 링 */}
        <ProgressRing result={badge.result} angle={0} />

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

      {/* 메모 표시 영역 */}
      {badge.memo && (
        <div className="text-center mt-2">
          <p className="text-sm text-gray-700">{badge.memo}</p>
        </div>
      )}
    </div>
  );
};

export default HistoryBadge;
