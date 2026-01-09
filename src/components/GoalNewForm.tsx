import { useState } from "react";
import GoalNameInput from "./GoalNameInput";
import GoalSuggestionCard from "./GoalSuggestionCard";
import GoalFormBottom from "./GoalFormBottom";
import { ActionButton } from "./ActionButton";

const GoalNewForm = () => {
  const [goalName, setGoalName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [purpose, setPurpose] = useState("");

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

        {/* 카테고리 + 목표 의도 */}
        <GoalFormBottom selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} purpose={purpose} onPurposeChange={setPurpose} />
      </div>
      <div className="flex m-3 gap-2">
        <ActionButton variant="disabled">취소</ActionButton>
        <ActionButton variant="primary">저장</ActionButton>
      </div>
    </>
  );
};

export default GoalNewForm;
