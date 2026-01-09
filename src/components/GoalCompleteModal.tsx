import { MedalBadge } from "./MedalBadge";
import { ActionButton } from "./ActionButton";

interface GoalCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLowerDifficulty: () => void;
  onMaintain: () => void;
  onIncreaseDifficulty: () => void;
  onNewGoal: () => void;
  categoryIcon: string;
  medalType: "gold" | "bronze" | "fail";
}

export const GoalCompleteModal = ({
  isOpen,
  onClose,
  onLowerDifficulty,
  onMaintain,
  onIncreaseDifficulty,
  onNewGoal,
  categoryIcon,
  medalType,
}: GoalCompleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-[10px] p-5 w-[342px]" onClick={(e) => e.stopPropagation()}>
        {/* 메달 뱃지 */}
        <div className="flex justify-center mb-6">
          <MedalBadge type={medalType} />
        </div>

        {/* 카테고리 아이콘 */}
        <div className="flex justify-center mb-6">
          <div>
            <img src={categoryIcon} alt="" />
          </div>
        </div>

        {/* 메시지 */}
        <div className="text-center text-black mb-5 text-[15px]">
          <p>지금 루틴이 잘 맞아요.</p>
          <p>3일 동안 난이도를 조금 올려볼까요?</p>
        </div>

        {/* 난이도 조절 버튼 */}
        <div className="flex gap-3 mb-3 text-[16px]">
          <div className="flex-1">
            <button
              onClick={onLowerDifficulty}
              className="bg-white text-[#E9631A] h-[50px] w-full rounded-[20px] border-[1.5px] border-[#E9631A] cursor-pointer"
            >
              난이도
              <br />
              낮추기
            </button>
          </div>

          <div className="flex-1">
            <button
              onClick={onMaintain}
              className="bg-white text-[#E9631A] h-[50px]  w-full rounded-[20px] border-[1.5px] border-[#E9631A] cursor-pointer"
            >
              유지하기
              <br />
            </button>
          </div>

          <div className="relative flex-1">
            <span className="absolute -top-4 right-6 text-[#E9631A] text-xs px-2 py-0.5 rounded-full z-10">추천</span>
            <button
              onClick={onIncreaseDifficulty}
              className="bg-white text-[#E9631A] h-[50px] w-full rounded-[20px] border-[1.5px] border-[#E9631A] cursor-pointer"
            >
              난이도 <br />
              높이기
            </button>
          </div>
        </div>

        {/* 새로운 목표 버튼 */}
        <ActionButton variant="disabled" onClick={onNewGoal}>
          새로운 목표 도전하기
        </ActionButton>
      </div>
    </div>
  );
};
