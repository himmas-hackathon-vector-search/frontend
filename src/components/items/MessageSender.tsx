import { useRef } from "react";

import IconAsk from "../icons/IconAsk";
import IconSend from "../icons/IconSend";

const MessageSender = () => {
  const messageRef = useRef<HTMLInputElement>(null);

  const handleAsk = () => {
    if (!messageRef.current?.value) return;
    console.log(messageRef.current?.value);
    messageRef.current!.value = "";
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
      <button
        type="button"
        className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-1"
        onClick={handleAsk}
      >
        <IconSend className="size-8 dark:fill-white" />
      </button>
    </div>
  );
};

export default MessageSender;
