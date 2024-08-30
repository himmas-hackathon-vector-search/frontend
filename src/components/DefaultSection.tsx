import { ReactNode } from "react";
import { motion } from "framer-motion";

interface DefaultSectionProps {
  children: ReactNode;
  remind?: string;
  title?: string;
  description?: string;
}

const DefaultSection = ({
  children,
  remind,
  title,
  description,
}: DefaultSectionProps) => {
  return (
    <motion.section
      className="flex flex-col p-8 mt-4 mb-8 shadow-lg rounded-md border border-gray-100 dark:border-gray-700"
      variants={{
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 50 },
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3 }}
    >
      <header className="mb-6 pb-2 space-y-2 border-b">
        {remind && (
          <p className="text-sm text-gray-400 font-medium uppercase">
            {remind}
          </p>
        )}
        {title && <h1 className="text-3xl font-bold text-center">{title}</h1>}
        {description && (
          <p className="px-4 text-sm text-gray-400 text-center whitespace-pre-line">
            {description}
          </p>
        )}
      </header>
      <main>{children}</main>
    </motion.section>
  );
};

export default DefaultSection;
