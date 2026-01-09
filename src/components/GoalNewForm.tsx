import { useState } from "react";
import GoalNameInput from "./GoalNameInput";
import GoalSuggestionCard from "./GoalSuggestionCard";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "./ActionButton";

const GoalNewForm = () => {
  const [goalName, setGoalName] = useState("");
  const navigate = useNavigate();

  // AI 추천 목표 데이터
  const suggestions = [
    {
      id: 1,
      title: "하루 15분 스트레칭",
      description: "꾸준히 하면 허리 통증 예방에 좋아요.",
    },
    {
      id: 2,
      title: "하루 10분 운동",
      description: "꾸준히 하면 건강해져요.",
    },
    {
      id: 3,
      title: "하루 10분 책읽기",
      description: "꾸준히 하면 똑똑해져요.",
    },
  ];

  const handleSuggestionClick = (title: string) => {
    setGoalName(title);
  };

  return (
    <>
      <div className="p-3 m-3 rounded-[10px] bg-white">
        {/* 안내 문구 */}
        <div className="py-4">
          <p className="text-[16px] text-[#252422] font-semibold">
            작심삼일이 이번 3일 목표를 제안해요.
            <br />
            원하는 목표를 선택해주세요.
          </p>
        </div>

        {/* 목표명 입력 */}
        <GoalNameInput value={goalName} onChange={setGoalName} />

        {/* AI 추천 카드들 */}
        <div className="">
          {suggestions.map((suggestion) => (
            <GoalSuggestionCard
              key={suggestion.id}
              title={suggestion.title}
              description={suggestion.description}
              onClick={() => handleSuggestionClick(suggestion.title)}
            />
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px]">
        <div className="flex m-3 gap-2">
          <ActionButton variant="disabled" onClick={() => navigate("/goal/new")}>
            취소
          </ActionButton>
          <ActionButton variant="primary">저장</ActionButton>
        </div>
      </div>
    </>
  );
};

export default GoalNewForm;
