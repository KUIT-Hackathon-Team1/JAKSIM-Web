import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/ActionButton";

const GoalModify = () => {
  const navigate = useNavigate();
  const [goalName, setGoalName] = useState("");
  const [goalIntent, setGoalIntent] = useState("");

  return (
    <div className="min-h-screen bg-[#FEF6EE] ">
      <header className="h-13 grid grid-cols-[1fr_auto_1fr] items-center bg-white border-b border-gray-100 px-4">
        <div className="flex justify-start">
          <button aria-label="back" onClick={() => navigate("/goal/:Runid")} className="cursor-pointer">
            <img src="/arrow-left.svg" alt="뒤로가기" />
          </button>
        </div>

        <h1 className="text-[18px] font-semibold text-[#3F3E3A] text-center">수정하기</h1>
      </header>

      <div className="p-2 m-3 rounded-[10px] bg-white">
        {/* 목표명 입력 */}
        <div className="p-3">
          <label className="block text-[16px] font-semibold text-gray-900 mb-2">
            목표명
            <span className="text-[#E9631A]">*</span>
          </label>
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="목표를 입력해주세요"
            className="w-full py-2 border-b border-b-gray-300 text-[15px] focus:outline-none focus:border-gray-400 placeholder:text-gray-400"
          />
        </div>

        {/* 목표 의도 입력 */}
        <div className="p-2 border-t border-gray-200">
          <label className="block text-[16px] font-semibold text-[#252422] mb-2">목표 의도</label>
          <div className="relative">
            <textarea
              value={goalIntent}
              onChange={(e) => setGoalIntent(e.target.value)}
              placeholder="최종적으로 어떤 목표를 달성하고 싶나요?"
              maxLength={20}
              className="w-full px-3 py-3 bg-[#F6F5F5] rounded-[10px] resize-none h-18 focus:outline-none text-[12px] placeholder:text-[#989898]"
            />
            <span className="absolute bottom-3 right-3 text-[12px] text-gray-400">{goalIntent.length}/20</span>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px]">
        <div className="flex gap-2 p-3 ">
          <ActionButton variant="disabled" onClick={() => navigate(-1)}>
            취소
          </ActionButton>
          <ActionButton variant="primary">저장</ActionButton>
        </div>
      </div>
    </div>
  );
};

export default GoalModify;
