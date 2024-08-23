import { useRef, useEffect } from "react";
import { Message } from "../interfaces.js";
import cn from "../../utils/cn.js";
import dayjs from "dayjs";

const formatDatetime = (datetime: string) => {
  // return dayjs(datetime).format("YYYY-MM-DD HH:mm:ss");
  if (dayjs().isSame(datetime, "day")) {
    return dayjs(datetime).format("HH:mm:ss");
  }
  return dayjs(datetime).format("YYYY-MM-DD");
};

const MessageBox = ({
  messages,
  isFetching,
}: {
  messages: Message[];
  isFetching: boolean;
}) => {
  const messageBoxRef = useRef<HTMLDivElement>(null);

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
      <div className="flex flex-col ">
        {messages.map((message: Message, index: number) => (
          <div
            key={index}
            className={cn("flex", !message.title && "flex-row-reverse")}
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
                <p className="text-gray-700 mt-2">{message.answer}</p>
              )}
            </div>
            <p className="flex my-2 text-xs text-gray-500 items-end">
              {formatDatetime(message.createdAt)}
            </p>
          </div>
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
