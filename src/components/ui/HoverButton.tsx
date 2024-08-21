import { useState } from "react";

interface HoverButtonProps {
  text: string;
  hoveredText: string;
  onClick?: () => void;
}

const HoverButton = ({ text, hoveredText, onClick }: HoverButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`py-2 px-4 min-w-36 min-h-12  text-white rounded-lg ${
        !isHovered ? "bg-blue-700" : "bg-blue-400"
      }`}
    >
      {!isHovered ? text : hoveredText}
    </button>
  );
};

export default HoverButton;
