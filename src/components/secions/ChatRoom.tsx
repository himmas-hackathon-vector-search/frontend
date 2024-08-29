import { useState } from "react";
import { motion } from "framer-motion";
import { Message } from "../interfaces";
import useHttpHandler from "../../hooks/httpHandler";

import MessageSender from "../items/MessageSender";
import MessageBox from "../items/MessageBox";
import chatRoomClass from "./ChatRoom.module.css";

const ChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { requestState, postData } = useHttpHandler();

  return (
    <motion.div
      className={`flex flex-col p-8 mt-4 shadow-lg rounded-md border border-gray-100 dark:border-gray-700 space-y-2 ${chatRoomClass.autoHeight}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <header>
        <h1 className="text-3xl font-bold text-center">Question & Answer</h1>
      </header>
      <MessageBox messages={messages} isFetching={requestState.isFetching} />
      <MessageSender onMessage={setMessages} onRequest={postData} />
    </motion.div>
  );
};

export default ChatRoom;
