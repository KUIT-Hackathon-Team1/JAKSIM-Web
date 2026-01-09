import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { GoalItem } from "../../components/GoalItem";
import type { GoalItemProps } from "../../components/GoalItem";
import { AchieveButton } from "../../components/AchieveButton";
import { DayMemo } from "../../components/DayMemo";
import { ActionButton } from "../../components/ActionButton";
import { GoalCompleteModal } from "../../components/GoalCompleteModal";
import type { GoalRunResponse } from "../../api/types";
import { GoalProgressCard } from "../../components/GoalProgressCard";
import { goalsApi } from "../../api/goals";

const MyGoal = () => {
  const navigate = useNavigate();
  const [selectedAchieve, setSelectedAchieve] = useState<"complete" | "partial" | "failed" | null>(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [memo, setMemo] = useState("");

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
    goalTitle: "하루 10분 스트레칭",
    category: "EXERCISE",
    categoryIconKey: "weight",
    runStatus: "IN_PROGRESS",
    startDate: "2026-01-10",
    expectedEndDate: "2026-01-12",
    days: [
      { dayIndex: 1, date: "2026-01-10", result: "NOT_SET", finalized: false },
      { dayIndex: 2, date: "2026-01-11", result: "NOT_SET", finalized: false },
      { dayIndex: 3, date: "2026-01-12", result: "NOT_SET", finalized: false },
    ],
  };

  // 실제 현재 날짜 기준으로 며칠째인지 계산
  const getCurrentDay = (): number => {
    const start = new Date(mockGoalData.startDate);
    const today = new Date();
    const diffTime = today.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // 1~3일 사이로 제한
    return Math.max(1, Math.min(diffDays, mockGoalData.days.length));
  };

  const currentDay = getCurrentDay();

  // 메달 타입 결정 (달성률에 따라)
  const getMedalType = (): "gold" | "bronze" | "fail" => {
    const completed = mockGoalData.days.filter((d) => d.finalized).length;
    const total = mockGoalData.days.length;
    const rate = completed / total;

    if (rate === 1) return "gold";
    if (rate >= 0.5) return "bronze";
    return "fail";
  };

  const handleDayEnd = async () => {
    // 달성 상태 선택 안 했으면 리턴
    if (selectedAchieve === null) {
      return;
    }

    try {
      const resultMap = {
        complete: "SUCCESS" as const,
        partial: "PARTIAL" as const,
        failed: "FAIL" as const,
      };

      await goalsApi.updateDayResult(mockGoalData.runId, currentDay, {
        result: resultMap[selectedAchieve],
        memo: memo,
        finalizeDay: true,
      });

      // 마지막 날(3일차)이면 모달 표시
      if (currentDay === mockGoalData.days.length) {
        setShowCompleteModal(true);
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FEF6EE]">
      <Header title="내 목표" onBack={() => navigate("/home")} onEdit={() => navigate("/goal/modify")} onComplete={() => console.log("종료")} />

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
        <div className="flex justify-center gap-3 w-85.5 bg-white p-2 rounded-[10px]">
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

      <DayMemo startDate={mockGoalData.startDate} initialDay={currentDay as 1 | 2 | 3} onMemoChange={(day, memoText) => setMemo(memoText)} />

      <div className="px-3 pb-3">
        <ActionButton variant="outline" onClick={handleDayEnd}>
          하루 끝내기
        </ActionButton>
      </div>

      {/* 완료 모달 */}
      <GoalCompleteModal
        isOpen={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        categoryIcon="/weight.svg"
        medalType={getMedalType()}
        onLowerDifficulty={() => {
          console.log("난이도 낮추기");
          setShowCompleteModal(false);
          navigate("/goal/continue", { state: { difficulty: "lower" } });
        }}
        onMaintain={() => {
          console.log("유지하기");
          setShowCompleteModal(false);
          navigate("/goal/continue", { state: { difficulty: "maintain" } });
        }}
        onIncreaseDifficulty={() => {
          console.log("난이도 높이기");
          setShowCompleteModal(false);
          navigate("/goal/continue", { state: { difficulty: "increase" } });
        }}
        onNewGoal={() => {
          console.log("새로운 목표");
          setShowCompleteModal(false);
          navigate("/GoalNew");
        }}
      />
    </div>
  );
};

export default MyGoal;
