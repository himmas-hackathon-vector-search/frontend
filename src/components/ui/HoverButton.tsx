import { useState } from "react";
import { motion } from "framer-motion";

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
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`py-2 px-4 min-w-36 min-h-12  text-white rounded-lg ${
        isHovered || disabled ? "bg-blue-400" : "bg-blue-700"
      }`}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring" }}
    >
      {disabled ? "處理中..." : !isHovered ? text : hoveredText}
    </motion.button>
  );
};

export default HoverButton;
