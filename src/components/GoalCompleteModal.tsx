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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        {/* 메달 뱃지 */}
        <div className="flex justify-center mb-6">
          <MedalBadge type={medalType} />
        </div>

        {/* 카테고리 아이콘 */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-[#FFBF3F] rounded-full flex items-center justify-center border-4 border-[#315762]">
            <img src={categoryIcon} alt="" className="w-12 h-12" />
          </div>
        </div>

        {/* 메시지 */}
        <div className="text-center mb-8">
          <p className="text-gray-800 mb-2">지금 루틴이 잘 맞아요.</p>
          <p className="text-gray-800">3일 동안 난이도를 조금 올려볼까요?</p>
        </div>

        {/* 난이도 조절 버튼 */}
        <div className="flex gap-3 mb-4">
          <ActionButton variant="outline" onClick={onLowerDifficulty}>
            난이도
            <br />
            낮추기
          </ActionButton>

          <ActionButton variant="outline" onClick={onMaintain}>
            유지하기
          </ActionButton>

          <div className="relative flex-1">
            <span className="absolute -top-2 right-2 bg-[#E9631A] text-white text-xs px-2 py-0.5 rounded-full z-10">추천</span>
            <ActionButton variant="outline" onClick={onIncreaseDifficulty}>
              난이도
              <br />
              높이기
            </ActionButton>
          </div>
        </div>

        {/* 새로운 목표 버튼 */}
        <ActionButton variant="outline" onClick={onNewGoal}>
          새로운 목표 도전하기
        </ActionButton>
      </div>
    </div>
  );
};
