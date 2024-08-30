import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Message } from "../interfaces";
import { motion } from "framer-motion";
import { useTheme } from "../../store/useTheme";
import { useQaMessage } from "../../store/useQaMessage";
import { requestStateSchema } from "../../hooks/httpHandler";
import { AxiosResponse } from "axios";
import Modal from "../ui/Modal";

import SystemStatus from "./SystemStatus";

import IconSend from "../icons/IconSend";

interface KeepedQuestion {
  qaId: string;
  question: string;
}

const MessageSender = ({
  requestState,
  onRequest,
}: {
  requestState: requestStateSchema;
  onRequest: (url: string, body: object) => Promise<AxiosResponse>;
}) => {
  const { theme } = useTheme();
  const { qaId, updateQaId, setMessages } = useQaMessage();
  const messageRef = useRef<HTMLInputElement>(null);
  const keepedQuestion = useRef<KeepedQuestion>({ qaId: "", question: "" });
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigate();

  const [canAsk, setCanAsk] = useState(false);

  const handleAsk = () => {
    if (!messageRef.current?.value.trim()) return;
    const messageQuestion = messageRef.current.value;
    setMessages((prev) => [
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

    onRequest("/qa/ask", { qaId, question: messageQuestion })
      .then((response) => {
        if (response.success) {
          const messages = response.data.message;
          messages.forEach((item: Message) => {
            item.createdAt = new Date().toISOString();
          });
          setMessages((prev) => [...prev, ...messages]);
        } else {
          keepedQuestion.current = {
            qaId: response.data.qaId,
            question: messageQuestion,
          };
          setShowModal(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleReAsk = () => {
    setShowModal(false);
    updateQaId(keepedQuestion.current.qaId);

    onRequest("/qa/ask", keepedQuestion.current)
      .then((response) => {
        if (response.success) {
          const messages = response.data.message;
          messages.forEach((item: Message) => {
            item.createdAt = new Date().toISOString();
          });
          setMessages((prev) => [...prev, ...messages]);
        } else {
          setShowModal(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {showModal && (
        <Modal title="偵測到資料庫版本異動" onClose={() => setShowModal(false)}>
          <p>{requestState.errorMessage}</p>
          <div className="flex flex-col sm:flex-row sm:justify-between items-end pt-4 px-2 space-y-4">
            <button
              className="py-2 px-4 w-full sm:w-auto rounded-lg bg-[#27ae60] hover:bg-green-400 text-gray-100 hover:text-gray-700 hover:font-bold"
              onClick={handleReAsk}
            >
              仍要提問
            </button>
            <button
              className="py-2 px-4 w-full sm:w-auto rounded-lg bg-[#2f80ed] hover:bg-blue-400 text-gray-100 hover:text-gray-700 hover:font-bold"
              onClick={() => navigation("/database")}
            >
              重新初始化
            </button>
          </div>
        </Modal>
      )}

      <div className="flex justify-between items-center">
        <SystemStatus status={canAsk} onStatus={setCanAsk} />
        <input
          type="text"
          placeholder={
            canAsk ? "Ask me a question" : "System is not ready for asking"
          }
          className="block w-full py-2 mr-3 sm:mx-3 pl-4 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-300 disabled:font-bold dark:disabled:bg-gray-900"
          name="message"
          required
          ref={messageRef}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleAsk();
            }
          }}
          disabled={!canAsk}
        />
        <motion.button
          type="button"
          className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-1 disabled:cursor-not-allowed"
          onClick={handleAsk}
          whileHover={{ scale: 1.1, rotate: -30 }}
          transition={{ type: "spring", stiffness: 300 }}
          disabled={!canAsk}
        >
          <IconSend
            className="size-8"
            stroke={theme === "dark" ? "#ffffff" : "#000000"}
          />
        </motion.button>
      </div>
    </>
  );
};

export default MessageSender;
