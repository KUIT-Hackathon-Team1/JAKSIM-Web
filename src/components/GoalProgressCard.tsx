import type { GoalRunResponse } from "../api/types";
import { Button } from "./Button";

interface GoalProgressCardProps {
  data: GoalRunResponse;
}

export const GoalProgressCard = ({ data }: GoalProgressCardProps) => {
  const currentDay = data.days.filter((d) => d.finalized).length || 1;

  // 카테고리별 아이콘
  const getIcon = (key: string) => {
    const icons: Record<string, string> = {
      weight: "🏋️", // 운동
      language: "💬", // 언어
      "self-development": "😊", // 자기계발
      health: "❤️", // 건강
    };
    return icons[key];
  };

  return (
    <div className="bg-white rounded-[10px] p-3 flex flex-col items-center">
      <div className="w-12 h-12 text-4xl">{getIcon(data.categoryIconKey)}</div>

      {/* 진행도 */}
      <div className="flex gap-1.5 mb-2">
        {data.days.map((day) => (
          <div key={day.dayIndex} className={`w-4 h-4 rounded-full ${day.finalized ? "bg-[#FFBF3F]" : "bg-[#E8E6E5]"}`} />
        ))}
      </div>

      {/* D+N 표시 */}
      <div className="text-[#315762] text-5xl font-semibold mb-2">
        D+{currentDay}
        <span className="text-[15px] text-[#736E67]">/{data.days.length}</span>
      </div>

      {/* 상태 뱃지 */}
      <Button label={data.runStatus === "IN_PROGRESS" ? "진행중" : "진행완료"} variant={data.runStatus === "IN_PROGRESS" ? "progress" : "complete"} />
    </div>
  );
};
