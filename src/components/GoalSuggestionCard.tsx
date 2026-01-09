interface GoalSuggestionCardProps {
  title: string;
  onClick: () => void;
}

const GoalSuggestionCard = ({ title, onClick }: GoalSuggestionCardProps) => {
  return (
    <div onClick={onClick} className="bg-[#F6F5F5] rounded-[10px] p-3 cursor-pointer my-3">
      <h3 className="text-[14px] font-semibold text-gray-900 mb-1">{title}</h3>
    </div>
  );
};

export default GoalSuggestionCard;
