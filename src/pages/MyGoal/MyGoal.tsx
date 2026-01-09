import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const { runId } = useParams<{ runId: string }>();
  const [selectedAchieve, setSelectedAchieve] = useState<
    "complete" | "partial" | "failed" | null
  >(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [memo, setMemo] = useState("");
  const [goalData, setGoalData] = useState<GoalRunResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // GoalProgressCard용 아이콘 매핑
  const getCategoryIconPath = (category: string, iconKey: string): string => {
    const iconMap: Record<string, string> = {
      exercise: "weight",
      health: "health",
      language: "language",
      self_dev: "self-development",
    };

    const fileName = iconMap[iconKey.toLowerCase()] || iconKey;
    return `/badge/default-${fileName}.svg`;
  };

  // 카테고리 배지 아이콘 매핑
  const getCategoryBadgeIcon = (iconKey: string): string => {
    const iconMap: Record<string, string> = {
      exercise: "weight",
      health: "heart",
      language: "messages",
      self_dev: "emoji-happy",
    };
    return iconMap[iconKey.toLowerCase()] || iconKey;
  };

  // 카테고리 한글명 매핑
  const getCategoryName = (iconKey: string): string => {
    const nameMap: Record<string, string> = {
      exercise: "운동",
      health: "건강",
      language: "언어",
      self_dev: "자기개발",
    };
    return nameMap[iconKey.toLowerCase()] || iconKey;
  };

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        setLoading(true);
        const data = await goalsApi.getRun(Number(runId));
        setGoalData(data);
      } catch (error) {
        console.error("목표 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    if (runId) {
      fetchGoalData();
    }
  }, [runId]);

  const getCurrentDay = (): number => {
    if (!goalData) return 1;
    return goalData.currentDayIndex;
  };

  const getMedalType = (): "gold" | "bronze" | "fail" => {
    if (!goalData) return "fail";

    const completed = goalData.days.filter((d) => d.finalized).length;
    const total = goalData.days.length;
    const rate = completed / total;

    if (rate === 1) return "gold";
    if (rate >= 0.5) return "bronze";
    return "fail";
  };

  const handleDayEnd = async () => {
    if (selectedAchieve === null || !goalData) {
      return;
    }

    try {
      const resultMap = {
        complete: "SUCCESS" as const,
        partial: "PARTIAL" as const,
        failed: "FAIL" as const,
      };

      const currentDay = getCurrentDay();
      const updatedData = await goalsApi.updateDayResult(
        goalData.runId,
        currentDay,
        {
          result: resultMap[selectedAchieve],
          memo: memo,
          finalizeDay: true,
        }
      );

      setGoalData(updatedData);

      if (currentDay === goalData.days.length) {
        setShowCompleteModal(true);
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FEF6EE] flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!goalData) {
    return (
      <div className="min-h-screen bg-[#FEF6EE] flex items-center justify-center">
        <p>목표를 불러올 수 없습니다.</p>
      </div>
    );
  }

  const currentDay = getCurrentDay();

  const goals: GoalItemProps[] = [
    {
      id: goalData.goalId,
      title: goalData.goalTitle,
      intent: goalData.goalIntent,
      category: getCategoryName(goalData.categoryIconKey),
      categoryIcon: `/${getCategoryBadgeIcon(goalData.categoryIconKey)}.svg`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FEF6EE]">
      <Header
        title="내 목표"
        runId={goalData.runId}
        onBack={() => navigate("/home")}
        onEdit={() => navigate("/goal/modify")}
        onComplete={() => navigate("/home")}
      />

      <div className="p-2 space-y-3">
        {goals.map((goal) => (
          <GoalItem key={goal.id} {...goal} />
        ))}
      </div>

      <div className="pb-3 px-3">
        <GoalProgressCard data={goalData} />
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
          <AchieveButton
            type="failed"
            state={selectedAchieve === "failed" ? "selected" : "default"}
            onClick={() => setSelectedAchieve("failed")}
          />
        </div>
      </div>

      <DayMemo
        startDate={goalData.startDate}
        initialDay={currentDay as 1 | 2 | 3}
        onMemoChange={(day, memoText) => setMemo(memoText)}
      />

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px]">
        <div className="px-3 pb-3">
          <ActionButton variant="outline" onClick={handleDayEnd}>
            하루 끝내기
          </ActionButton>
        </div>
      </div>

      <GoalCompleteModal
        isOpen={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        categoryIcon={getCategoryIconPath(
          goalData.category,
          goalData.categoryIconKey
        )}
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
