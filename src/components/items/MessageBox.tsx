import { samples } from "./chatSample.js";
import cn from "../../utils/cn.js";
import dayjs from "dayjs";

const formatDatetime = (datetime: string) => {
  // return dayjs(datetime).format("YYYY-MM-DD HH:mm:ss");
  if (dayjs().isSame(datetime, "day")) {
    return dayjs(datetime).format("HH:mm:ss");
  }
  return dayjs(datetime).format("YYYY-MM-DD");
};

interface Message {
  title: string;
  answer: string;
  score: number;
  question: string;
  createdAt: string;
}

const MessageBox = () => {
  return (
    <div className="flex flex-col h-full px-1 py-4 bg-gray-100 rounded-md border overflow-y-auto">
      {samples.map((message: Message, index: number) => (
        <div
          key={index}
          className={cn("flex", !message.title && "flex-row-reverse")}
        >
          <div
            className={cn(
              "flex flex-col max-w-md w-fit m-2 rounded-md",
              message.title ? "bg-blue-200 p-4" : "bg-green-200 p-2"
            )}
          >
            <div className="flex items-center justify-between">
              {message.title ? (
                <h2 className="text-lg font-bold text-gray-900">
                  {message.title}
                </h2>
              ) : (
                <p className="text-sm text-gray-700">{message.question}</p>
              )}
              <span className="text-sm text-gray-500">{message.score}</span>
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
  );
};

export default MessageBox;
