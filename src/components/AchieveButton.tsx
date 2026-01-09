interface AchieveButtonProps {
  type: "complete" | "partial" | "failed";
  state?: "default" | "selected" | "fixed";
  onClick?: () => void;
}

export const AchieveButton = ({ type, state = "default", onClick }: AchieveButtonProps) => {
  const getIcon = () => {
    if (state === "fixed") {
      if (type === "complete") return "/success-green.svg";
      if (type === "partial") return "/half-white.svg";
      if (type === "failed") return "/fail-orange.svg";
    }

    if (state === "selected") {
      if (type === "complete") return "/success-orange.svg";
      if (type === "partial") return "/half-orange.svg";
      if (type === "failed") return "/fail-orange.svg";
    }

    if (type === "complete") return "/success.svg";
    if (type === "partial") return "/half.svg";
    if (type === "failed") return "/fail.svg";

    return "/success.svg";
  };

  const getLabel = () => {
    switch (type) {
      case "complete":
        return "목표 달성";
      case "partial":
        return "부분 달성";
      case "failed":
        return "달성 실패";
    }
  };

  const getButtonStyle = () => {
    if (state === "fixed") {
      switch (type) {
        case "complete":
          return "bg-[#FFBF3F] text-[#315762]";
        case "partial":
          return "bg-[#315762] text-white";
        case "failed":
          return "bg-[#E8E6E5] text-[#E9631A]";
      }
    }

    if (state === "selected") {
      return "bg-white border-2 border-[#E9631A] text-[#E9631A]";
    }

    return "bg-white border border-2 border-[#E8E6E5] text-[#252422] hover:bg-[#F6F5F5] hover:text-[#252422] hover:border-[#E8E6E5]";
  };

  return (
    <button onClick={onClick} className={`flex items-center justify-center gap-2 px-[10px] py-[15px] text-[13px] rounded-[10px] ${getButtonStyle()}`}>
      <img src={getIcon()} alt="" />
      <span>{getLabel()}</span>
    </button>
  );
};
