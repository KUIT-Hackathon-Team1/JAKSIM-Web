import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoalFormBottom from "../../components/GoalFormBottom";
import { ActionButton } from "../../components/ActionButton";

// 카테고리 매핑 추가
const CATEGORY_MAP: { [key: string]: string } = {
  건강: "HEALTH",
  언어: "LANGUAGE",
  운동: "EXERCISE",
  자기개발: "SELF_DEVELOPMENT",
};

const GoalNew = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [purpose, setPurpose] = useState("");

  const handleNext = () => {
    if (!selectedCategory) {
      alert("카테고리를 선택해주세요");
      return;
    }

    // 한글 → 영어로 변환
    const englishCategory = CATEGORY_MAP[selectedCategory];

    navigate("/goal/new/confirm", {
      state: {
        category: englishCategory, // 영어로 변환해서 전달
        intent: purpose,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FEF6EE] flex flex-col">
      <header className="h-13 grid grid-cols-[1fr_auto_1fr] items-center bg-white px-4">
        <div className="flex justify-start">
          <button aria-label="back" onClick={() => navigate("/home")} className="cursor-pointer">
            <img src="/arrow-left.svg" alt="뒤로가기" />
          </button>
        </div>
        <h1 className="text-[18px] font-semibold text-[#3F3E3A] text-center">목표 세우기</h1>
      </header>

      <div className="m-3 bg-white rounded-[10px]">
        <div className="px-3 py-5">
          <p className="text-[16px] text-[#252422] font-semibold">
            작심삼일이 목표를 3일 단위로 쪼개줄게요.
            <br />
            달성 목표에 대한 기본 정보를 입력해주세요.
          </p>
        </div>
        <div className="flex-1 m-3">
          <GoalFormBottom selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} purpose={purpose} onPurposeChange={setPurpose} />
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px]">
        <div className="flex m-3 gap-2">
          <ActionButton variant="disabled" onClick={() => navigate("/home")}>
            취소
          </ActionButton>
          <ActionButton variant="primary" onClick={handleNext}>
            다음으로
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default GoalNew;
