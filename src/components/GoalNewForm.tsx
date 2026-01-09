import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GoalNameInput from "./GoalNameInput";
import GoalSuggestionCard from "./GoalSuggestionCard";
import { ActionButton } from "./ActionButton";
import { goalsApi } from "../api/goals";

interface Suggestion {
  id: number;
  title: string;
}

const GoalNewForm = () => {
  const [goalName, setGoalName] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const { category, intent } = location.state || {};

  useEffect(() => {
    if (!category || !intent) {
      console.error("카테고리 또는 목표 의도가 없습니다");
      return;
    }

    const fetchRecommendations = async () => {
      try {
        const requestData = {
          goalCategory: category,
          intent: intent,
          baseGoalId: null,
          action: "UP",
        };
        console.log("서버로 보내는 최종 데이터:", requestData);

        const result = await goalsApi.getRecommendations(requestData);

        if (result.success && result.data) {
          const formattedSuggestions = result.data.map((title, index) => ({
            id: index + 1,
            title: title,
          }));
          setSuggestions(formattedSuggestions);
        }
      } catch (err) {
        console.error("목표 추천 불러오기 실패:", err);
        // 실패하면 목 데이터
        const mockData = [
          "하루 15분 스트레칭",
          "하루 10분 걷기",
          "자기 전 5분 코어 운동",
        ];
        setSuggestions(
          mockData.map((title, index) => ({ id: index + 1, title }))
        );
      }
    };

    fetchRecommendations();
  }, [category, intent]);

  const handleSuggestionClick = (title: string) => {
    setGoalName(title);
  };

  // GoalNewForm.tsx의 handleSave 함수 수정 제안
  const handleSave = async () => {
    if (!goalName.trim()) {
      alert("목표명을 입력해주세요");
      return;
    }

    // 🔍 서버로 보내기 전 데이터 로그 확인
    const payload = {
      goalTitle: goalName,
      goalSubtitle: "",
      goalCategory: category,
      intent: intent,
      baseGoalId: null,
      action: null,
    };

    console.log("저장 시도 데이터:", payload);

    try {
      const result = await goalsApi.saveGoal(payload);
      if (result.success) {
        navigate("/home");
      } else {
        alert("목표 저장에 실패했습니다.");
      }
    } catch (err) {
      console.error("목표 저장 실패 상세:", err);
      alert("목표 저장에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="p-3 m-3 rounded-[10px] bg-white">
        <div className="py-4">
          <p className="text-[16px] text-[#252422] font-semibold">
            작심삼일이 이번 3일 목표를 제안해요.
            <br />
            원하는 목표를 선택해주세요.
          </p>
        </div>

        <GoalNameInput value={goalName} onChange={setGoalName} />

        <div className="py-2">
          <p className="text-[14px] font-semibold text-[#252422]">
            ⭐ 이번 3일 목표 AI 추천
          </p>
          <p className="text-[12px] text-[#8E8E8E] mt-1">
            AI가 추천해주는 이번 3일 목표입니다.
            <br />
            원하는 도전과제를 선택해주세요.
          </p>
        </div>

        <div className="">
          {suggestions.map((suggestion) => (
            <GoalSuggestionCard
              key={suggestion.id}
              title={suggestion.title}
              onClick={() => handleSuggestionClick(suggestion.title)}
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px]">
        <div className="flex m-3 gap-2">
          <ActionButton variant="disabled" onClick={() => navigate(-1)}>
            취소
          </ActionButton>
          <ActionButton variant="primary" onClick={handleSave}>
            저장
          </ActionButton>
        </div>
      </div>
    </>
  );
};

export default GoalNewForm;
