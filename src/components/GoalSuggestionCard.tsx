interface GoalSuggestionCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

const GoalSuggestionCard = ({ title, description, onClick }: GoalSuggestionCardProps) => {
  return (
    <div onClick={onClick} className="bg-[#F6F5F5] rounded-[10px] p-3 cursor-pointer my-3">
      <h3 className="text-[14px] font-semibold text-gray-900 mb-1">{title}</h3>
      <ul className="list-disc list-inside">
        <li className="text-[11px] text-[#8E8E8E] pl-5">{description}</li>
      </ul>
    </div>
  );
};

export default GoalSuggestionCard;
