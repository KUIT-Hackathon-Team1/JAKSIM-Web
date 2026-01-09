interface ButtonProps {
  label: string;
  variant: "category" | "selectable" | "progress" | "complete";
  icon?: string;
  selected?: boolean;
  onClick?: () => void;
}

export const Button = ({
  label,
  variant,
  icon,
  selected,
  onClick,
}: ButtonProps) => {
  const getButtonStyle = () => {
    switch (variant) {
      case "category":
        return "bg-[#FFBF3F] text-[#315762]";

      case "selectable":
        return selected
          ? "bg-[#315762] text-white"
          : "bg-white text-[#315762] border-2 border-[#315762]";

      case "progress":
        return "bg-[#E9631A] text-[#FEF6EE]";

      case "complete":
        return "bg-[#FFBF3F] text-[#252422]";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 w-fix px-2 py-1 rounded-[10px] text-[12px]  ${getButtonStyle()}`}
    >
      {icon && <img src={icon} alt="" />}
      <span>{label}</span>
    </button>
  );
};
