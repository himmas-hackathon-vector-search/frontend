import { useState } from "react";

interface HoverButtonProps {
  text: string;
  hoveredText: string;
  disabled?: boolean;
  onClick?: () => void;
}

const HoverButton = ({
  text,
  hoveredText,
  disabled,
  onClick,
}: HoverButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`py-2 px-4 min-w-36 min-h-12  text-white rounded-lg ${
        isHovered || disabled ? "bg-blue-400" : "bg-blue-700"
      }`}
      disabled={disabled}
    >
      {disabled ? "處理中..." : !isHovered ? text : hoveredText}
    </button>
  );
};

export default HoverButton;
