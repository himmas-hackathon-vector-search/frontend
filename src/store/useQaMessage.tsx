import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface QaMessageType {
  title: string | null;
  answer: string | null;
  score: number | null;
  question: string;
  createdAt: string;
}

interface QaMessageContextType {
  qaId: string | null;
  messages: QaMessageType[];
  updateQaId: (newQaId: string) => void;
  setMessages: Dispatch<SetStateAction<QaMessageType[]>>;
}

const QaMessageContext = createContext<QaMessageContextType>({
  qaId: null,
  messages: [],
  updateQaId: () => {},
  setMessages: () => {},
});

const QaMessageProvider = ({ children }: { children: ReactNode }) => {
  const [qaId, setQaId] = useState<string | null>(
    localStorage.getItem("qaId") || null
  );
  const [messages, setMessages] = useState<QaMessageType[]>([]);
  const updateQaId = (newQaId: string) => {
    localStorage.setItem("qaId", newQaId);
    setQaId(newQaId);
  };

  return (
    <QaMessageContext.Provider
      value={{ qaId, messages, updateQaId, setMessages }}
    >
      {children}
    </QaMessageContext.Provider>
  );
};

export default QaMessageProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useQaMessage = () => useContext(QaMessageContext);
