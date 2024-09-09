import { ReactNode } from "react";
import { motion } from "framer-motion";

const StepCard = ({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <motion.div
      className="flex flex-row sm:flex-col p-2 justify-start items-center w-72 h-max sm:w-52 sm:min-h-60 rounded-xl bg-blue-500 bg-opacity-30 shadow-lg"
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
      }}
    >
      {/* <div className="w-0.5 sm:w-full h-3/4 sm:h-0.5 m-2 bg-gray-900" /> */}
      <div className="flex flex-col items-center size-full p-4 space-y-1">
        <div className="flex items-center w-full space-x-2 border-b border-black dark:border-white">
          {icon}
          <h3 className="font-serif font-bold sm:font-semibold text-xl my-4 sm:my-0 w-full">
            {title}
          </h3>
        </div>
        <p className="font-sans text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

export default StepCard;
