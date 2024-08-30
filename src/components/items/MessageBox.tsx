import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Message } from "../interfaces.js";
import { useQaMessage } from "../../store/useQaMessage";
import cn from "../../utils/cn.js";
import dayjs from "dayjs";

const formatDatetime = (datetime: string) => {
  if (dayjs().isSame(datetime, "day")) {
    return dayjs(datetime).format("HH:mm:ss");
  }
  return dayjs(datetime).format("YYYY-MM-DD");
};

const MessageBox = ({ isFetching }: { isFetching: boolean }) => {
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const { messages } = useQaMessage();

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={messageBoxRef}
      className="flex flex-col justify-between h-full px-1 py-4 bg-gray-100 dark:bg-gray-900 rounded-md border overflow-y-auto"
    >
      <div className="flex flex-col">
        {messages.map((message: Message, index: number) => (
          <motion.div
            key={index}
            className={cn("flex", !message.title && "flex-row-reverse")}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visiable: { opacity: 1, y: 0 },
            }}
            transition={{ type: "just", stiffness: 300, duration: 0.1 }}
            initial="hidden"
            animate="visiable"
          >
            <div
              className={cn(
                "flex flex-col max-w-md w-fit m-2 rounded-md",
                message.title
                  ? "bg-blue-200 dark:bg-blue-400 p-4"
                  : "bg-green-200 dark:bg-green-400 p-2"
              )}
            >
              <div className="flex items-center justify-between space-x-2">
                {message.title ? (
                  <h2 className="text-lg font-bold text-gray-900">
                    {message.title}
                  </h2>
                ) : (
                  <p className="text-sm text-gray-700">{message.question}</p>
                )}
                {message.score && (
                  <span className="text-sm text-gray-500">
                    score: {message.score}
                  </span>
                )}
              </div>

              {message.answer && (
                <p
                  className="text-gray-700 mt-2"
                  dangerouslySetInnerHTML={{ __html: message.answer }}
                ></p>
              )}
            </div>
            <p className="flex my-2 text-xs text-gray-500 items-end">
              {formatDatetime(message.createdAt)}
            </p>
          </motion.div>
        ))}
      </div>
      {isFetching && (
        <div className="animate-pulse text-xs font-bold ml-2">
          thinking for your question ...
        </div>
      )}
    </div>
  );
};

export default MessageBox;
