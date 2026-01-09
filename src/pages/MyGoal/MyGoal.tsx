import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { GoalItem } from "../../components/GoalItem";
import type { GoalItemProps } from "../../components/GoalItem";
import { AchieveButton } from "../../components/AchieveButton";
import { DayMemo } from "../../components/DayMemo";
import { ActionButton } from "../../components/ActionButton";
import type { GoalRunResponse } from "../../api/types";
import { GoalProgressCard } from "../../components/GoalProgressCard";

const MyGoal = () => {
  const navigate = useNavigate();
  const [selectedAchieve, setSelectedAchieve] = useState<"complete" | "partial" | "failed" | null>(null);

  // 더미 데이터
  const goals: GoalItemProps[] = [
    {
      id: 1,
      title: "하루 10분 스트레칭",
      subtitle: "더 유연한 나를 위해서!",
      category: "운동",
      categoryIcon: "/weight.svg",
    },
  ];
  const mockGoalData: GoalRunResponse = {
    runId: 1,
    goalId: 1,
    goalTitle: "운동하기",
    category: "운동",
    categoryIconKey: "weight",
    runStatus: "IN_PROGRESS",
    startDate: "2025-01-07",
    expectedEndDate: "2025-01-09",
    days: [
      { dayIndex: 1, date: "2025-01-07", result: "완료", finalized: true },
      { dayIndex: 2, date: "2025-01-08", result: "완료", finalized: true },
      { dayIndex: 3, date: "2025-01-09", result: "", finalized: false },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FEF6EE]">
      <Header title="내 목표" onBack={() => navigate("/home")} onEdit={() => console.log("수정")} onComplete={() => console.log("종료")} />

      <div className="p-2 space-y-3">
        {goals.map((goal) => (
          <GoalItem key={goal.id} {...goal} />
        ))}
      </div>

      {/* GoalCard 연결 */}
      <div className="pb-3 px-3">
        <GoalProgressCard data={mockGoalData} />
      </div>

      <div className="flex justify-center">
        <div className="flex justify-center gap-3 w-[342px] bg-white p-2 rounded-[10px]">
          <AchieveButton
            type="complete"
            state={selectedAchieve === "complete" ? "selected" : "default"}
            onClick={() => setSelectedAchieve("complete")}
          />
          <AchieveButton
            type="partial"
            state={selectedAchieve === "partial" ? "selected" : "default"}
            onClick={() => setSelectedAchieve("partial")}
          />
          <AchieveButton type="failed" state={selectedAchieve === "failed" ? "selected" : "default"} onClick={() => setSelectedAchieve("failed")} />
        </div>
      </div>

      <DayMemo startDate={mockGoalData.startDate} />
      <div className="px-3">
        <ActionButton variant="outline">하루 끝내기</ActionButton>
      </div>
    </div>
  );
};

export default MyGoal;
