interface MedalBadgeProps {
  type: "gold" | "bronze" | "fail";
}

export const MedalBadge = ({ type }: MedalBadgeProps) => {
  const getBadgeStyle = () => {
    switch (type) {
      case "gold":
        return "bg-[#FFBF3F] text-white";
      case "bronze":
        return "bg-[#F4B37D] text-white";
      case "fail":
        return "bg-[#B4B0AC] text-white";
    }
  };

  const getLabel = () => {
    switch (type) {
      case "gold":
        return "GOLD";
      case "bronze":
        return "BRONZE";
      case "fail":
        return "FAIL";
    }
  };

  return <div className={`w-[90px] py-0.5 rounded-[20px] text-[16px] text-center font-semibold ${getBadgeStyle()}`}>{getLabel()}</div>;
};
