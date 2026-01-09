interface GoalNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

const GoalNameInput = ({ value, onChange }: GoalNameInputProps) => {
  return (
    <div className="">
      {/* 목표명 입력 */}
      <div className="mb-3">
        <label className="block text-[16px] font-semibold text-gray-900">
          목표명 <span className="text-[#E9631A]">*</span>
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="목표를 입력해주세요"
          className="w-full py-2 border-b border-b-gray-300 text-[15px] focus:outline-none focus:border-gray-400 placeholder:text-gray-400"
        />
      </div>

      {/* AI 추천 섹션 */}
      <div className="mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[13px]">⭐</span>
          <h2 className="text-[13px] font-semibold text-[#252422]">이번 3일 목표 AI 추천</h2>
        </div>
        <p className="text-[12px] text-[#989898] mb-3 pl-8">AI가 추천해주는 이번 3일 목표입니다.</p>
      </div>
    </div>
  );
};

export default GoalNameInput;
