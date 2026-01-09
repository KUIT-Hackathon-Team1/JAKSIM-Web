import { Button } from "./Button";

export interface GoalItemProps {
  id: number;
  title: string;
  intent: string;
  category: string;
  categoryIcon: string;
}

export const GoalItem = ({ title, intent, category, categoryIcon }: GoalItemProps) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg">
      {/* 목표 정보 */}
      <div className="flex-1">
        <h3 className="text-[16px] font-semibold text-[#3F3E3A]">• {title}</h3>
        <p className="text-[12px] text-[#625E58]">{intent}</p>
      </div>

      {/* 포인트 배지 */}
      <Button label={`${category}`} variant="category" icon={categoryIcon} />
    </div>
  );
};
