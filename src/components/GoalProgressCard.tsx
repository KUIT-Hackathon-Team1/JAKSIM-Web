import type { GoalRunResponse } from "../api/types";
import { Button } from "./Button";

interface GoalProgressCardProps {
  data: GoalRunResponse;
}

export const GoalProgressCard = ({ data }: GoalProgressCardProps) => {
  const getCurrentDay = (): number => {
    const finalizedDays = data.days.filter((d) => d.finalized).length;
    return finalizedDays === data.days.length ? finalizedDays : finalizedDays + 1;
  };

  const currentDay = getCurrentDay();

  // result에 따른 색상
  const getStatusColor = (result: string, finalized: boolean) => {
    if (!finalized) return "bg-[#E8E6E5]";

    switch (result) {
      case "DONE":
        return "bg-[#FFBF3F]";
      case "PARTIAL":
        return "bg-[#315762]";
      case "FAIL":
        return "bg-[#736E67]";
      default:
        return "bg-[#E8E6E5]";
    }
  };

  // 현재까지의 달성 등급 판정 (아이콘용)
  const getAchievementLevel = (): "success" | "half" | "fail" | "default" => {
    const finalizedDays = data.days.filter((d) => d.finalized);

    if (finalizedDays.length === 0) {
      return "default";
    }

    if (finalizedDays.some((d) => d.result === "FAIL")) {
      return "fail";
    }

    if (finalizedDays.some((d) => d.result === "PARTIAL")) {
      return "half";
    }

    if (finalizedDays.length === data.days.length && finalizedDays.every((d) => d.result === "DONE")) {
      return "success";
    }

    return "default";
  };

  // 아이콘 경로 생성
  const getIconPath = (): string => {
    const level = getAchievementLevel();
    return `/badge/${level}-${data.categoryIconKey}.svg`;
  };

  return (
    <div className="bg-white rounded-[10px] p-3 flex flex-col items-center">
      {/* 아이콘만 등급에 따라 변경 */}
      <img src={getIconPath()} alt={data.category} className="w-12 h-12" />

      <div className="flex gap-1.5 mb-2 mt-2">
        {data.days.map((day) => (
          <div key={day.dayIndex} className={`w-4 h-4 rounded-full ${getStatusColor(day.result, day.finalized)}`} />
        ))}
      </div>

      <div className="text-[#315762] text-5xl font-semibold mb-2">
        D+{currentDay}
        <span className="text-[15px] text-[#736E67]">/{data.days.length}</span>
      </div>

      {/* 뱃지는 진행중/진행완료만 */}
      <Button label={data.runStatus === "IN_PROGRESS" ? "진행중" : "진행완료"} variant={data.runStatus === "IN_PROGRESS" ? "progress" : "complete"} />
    </div>
  );
};
