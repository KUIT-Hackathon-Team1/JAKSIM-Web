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
    </div>
  );
};

export default GoalNameInput;
