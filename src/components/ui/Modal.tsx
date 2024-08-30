import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../store/useTheme";

import IconCrossClear from "../icons/IconCrossClear";

interface ModalProps {
  children: ReactNode;
  title?: string;
  onClose: () => void;
}

const Modal = ({ children, title, onClose }: ModalProps) => {
  const { theme } = useTheme();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialogRef.current;
    modal?.showModal();

    return () => {
      modal?.close();
    };
  }, []);

  return createPortal(
    <motion.dialog
      ref={dialogRef}
      className="flex flex-col mx-auto my-10 p-1 fixed top-[1/10] z-40 rounded-md bg-white text-black dark:bg-gray-900 dark:text-white backdrop:fixed backdrop:top-0 backdrop:left-0 backdrop:h-dvh backdrop:w-full backdrop:bg-black backdrop:bg-opacity-50"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.2 }}
    >
      <>
        <div className="flex justify-end">
          <button onClick={onClose}>
            <IconCrossClear
              className="size-6"
              fill={theme === "dark" ? "#ffffff" : "#000000"}
            />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center pt-1 pb-4 px-4">
          {title && (
            <>
              <h1 className="text-2xl font-bold">{title}</h1>
              <hr className="w-full my-1 border-gray-200 dark:border-gray-700" />
            </>
          )}
          <div className="flex flex-col px-4 pt-2 space-y-2">{children}</div>
        </div>
      </>
    </motion.dialog>,
    document.getElementById("modal") as Element
  );
};

export default Modal;
