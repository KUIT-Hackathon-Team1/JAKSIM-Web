interface GoalFormBottomProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  purpose: string;
  onPurposeChange: (value: string) => void;
}

const GoalFormBottom = ({ selectedCategory, onCategorySelect, purpose, onPurposeChange }: GoalFormBottomProps) => {
  const categories = ["건강", "언어", "운동", "자기개발"];

  return (
    <div className="">
      {/* 카테고리 */}
      <div className="mb-4">
        <label className="block text-[16px] font-semibold text-gray-900 mb-1">
          카테고리 <span className="text-[#E9631A]">*</span>
        </label>
        <p className="text-[12px] text-[#989898] mb-2 pl-5">목표 카테고리를 선택해주세요</p>
        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`px-2 py-1 rounded-[10px] border text-[12px] font-medium ${
                selectedCategory === category ? "bg-[#315762] text-white border-[#315762]" : "bg-white text-[#315762] border-[#315762] border-[1.5px]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 목표 의도 */}
      <div className="">
        <label className="block text-[16px] font-semibold  border-t border-gray-200 text-[#252422] pt-2 mb-2">목표 의도</label>
        <div className="relative">
          <textarea
            value={purpose}
            onChange={(e) => onPurposeChange(e.target.value)}
            placeholder="왜 이 목표를 시작하려고 하나요?"
            maxLength={20}
            className="w-full px-3 py-3 bg-[#F6F5F5] rounded-[10px] resize-none h-18 focus:outline-none text-[12px] placeholder:text-[#989898]"
          />
          <span className="absolute bottom-3 right-3 text-[12px] text-gray-400">{purpose.length}/20</span>
        </div>
      </div>
    </div>
  );
};

export default GoalFormBottom;
