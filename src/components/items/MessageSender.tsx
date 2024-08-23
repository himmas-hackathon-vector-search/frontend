import { useRef, Dispatch, SetStateAction } from "react";
import { Message } from "../interfaces";
import { motion } from "framer-motion";
import { useTheme } from "../../store/useTheme";
import { AxiosResponse } from "axios";

import IconAsk from "../icons/IconAsk";
import IconSend from "../icons/IconSend";

const MessageSender = ({
  onMessage,
  onRequest,
}: {
  onMessage: Dispatch<SetStateAction<Message[]>>;
  onRequest: (url: string, body: object) => Promise<AxiosResponse>;
}) => {
  const { theme } = useTheme();
  const messageRef = useRef<HTMLInputElement>(null);

  const handleAsk = () => {
    if (!messageRef.current?.value.trim()) return;
    const messageQuestion = messageRef.current.value;

    onMessage((prev) => [
      ...prev,
      {
        title: null,
        answer: null,
        score: null,
        question: messageQuestion,
        createdAt: new Date().toISOString(),
      },
    ]);
    messageRef.current!.value = "";

    onRequest("/qa/ask", { qaId: null, question: messageQuestion })
      .then((response) => {
        const { data } = response;
        data.createdAt = new Date().toISOString();
        onMessage((prev) => [...prev, data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex justify-between items-center">
      <IconAsk className=" hidden sm:block size-8 dark:fill-white" />
      <input
        type="text"
        placeholder="Ask me a question"
        className="block w-full py-2 mr-3 sm:mx-3 pl-4 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name="message"
        required
        ref={messageRef}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleAsk();
          }
        }}
      />
      <motion.button
        type="button"
        className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-1"
        onClick={handleAsk}
        whileHover={{ scale: 1.1, rotate: -30 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <IconSend
          className="size-8"
          stroke={theme === "dark" ? "#ffffff" : "#000000"}
        />
      </motion.button>
    </div>
  );
};

export default MessageSender;
