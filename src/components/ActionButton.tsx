interface ActionButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "secondary" | "disabled";
  size?: "default" | "large";
  onClick?: () => void;
}

export const ActionButton = ({ children, variant = "primary", onClick }: ActionButtonProps) => {
  const getVariantStyle = () => {
    switch (variant) {
      case "primary":
        return "bg-[#E9631A] text-white cursor-pointer";
      case "outline":
        return "bg-white text-[#E9631A] border-[1.5px] border-[#E9631A] cursor-pointer";
      case "secondary":
        return "bg-[#F6F5F5] text-[#B4B0AC] border-[1.5px] border-[#B4B0AC] cursor-not-allowed";
      case "disabled":
        return "bg-[#E8E6E5] text-[#625E58] cursor-pointer";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`
        w-full
        ${getVariantStyle()}
        py-3 text-[16px]
        rounded-[20px]
      `}
    >
      {children}
    </button>
  );
};
