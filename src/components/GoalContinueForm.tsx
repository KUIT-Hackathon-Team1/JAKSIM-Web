import { useState } from "react";
import GoalNameInput from "../components/GoalNameInput";
import GoalSuggestionCard from "./GoalSuggestionCard";
import { ActionButton } from "./ActionButton";

interface GoalContinueFormProps {
  value: string;
  onChange: (value: string) => void;
  difficulty: "lower" | "maintain" | "increase";
}

const GoalContinueForm = ({ value, onChange, difficulty }: GoalContinueFormProps) => {
  const [goalName, setGoalName] = useState("");

  const difficultyText = {
    lower: "낮추기",
    maintain: "유지하기",
    increase: "높이기",
  };

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
        <GoalNameInput value={goalName} onChange={setGoalName} />
        <span className="text-[12px] text-[#989898] pl-8">
          이번 루프에서 선택한 난이도는 <span className="text-[#E9631A]">{difficultyText[difficulty]}</span> 입니다.
        </span>

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
        <div className="border-t border-gray-200 pt-2">
          <label className="block text-[16px] font-semibold text-[#252422] mb-2">목표 의도</label>
          <div className="relative">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="왜 이 목표를 시작하려고 하나요?"
              maxLength={20}
              className="w-full px-3 py-3 bg-[#F6F5F5] rounded-[10px] resize-none h-18 focus:outline-none text-[12px] placeholder:text-[#989898]"
            />
            <span className="absolute bottom-3 right-3 text-[12px] text-gray-400">{value.length}/20</span>
          </div>
        </div>
      </div>
      <div className="flex m-3 gap-2">
        <ActionButton variant="disabled">취소</ActionButton>
        <ActionButton variant="primary">저장</ActionButton>
      </div>
    </>
  );
};

export default GoalContinueForm;
