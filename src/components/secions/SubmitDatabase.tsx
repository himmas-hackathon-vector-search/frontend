import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQaMessage } from "../../store/useQaMessage";
import { AnimatePresence } from "framer-motion";
import DefaultSection from "../DefaultSection";
import HoverButton from "../ui/HoverButton";
import useHttpHandler from "../../hooks/httpHandler";
import Modal from "../ui/Modal";
import cn from "../../utils/cn";
import dayjs from "dayjs";

interface SubmitDatabaseProps {
  remind: string;
  title: string;
  description: string;
  databaseInfo: {
    baseDataId: string | null;
    dictionaryId: string | null;
  };
}

interface ResponseDataTypes {
  success: boolean;
  message: string;
  qaId: string | null;
}

const SubmitDatabase = (props: SubmitDatabaseProps) => {
  const navigate = useNavigate();
  const { requestState, postData } = useHttpHandler();
  const { updateQaId } = useQaMessage();
  const [showModal, setShowModal] = useState({
    show: false,
    remainingTime: "",
  });
  const apiResponse = useRef<ResponseDataTypes>({
    success: false,
    message: "",
    qaId: null,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (
      apiResponse.current.message ===
        "資料庫剛被初始化完成，請間隔10分鐘後進行。" &&
      dayjs().isBefore(dayjs(apiResponse.current.qaId))
    ) {
      timer = setInterval(() => {
        const remainingMinutes = dayjs(apiResponse.current.qaId).diff(
          dayjs(),
          "minute"
        );
        const remainingSeconds =
          dayjs(apiResponse.current.qaId).diff(dayjs(), "second") % 60;
        setShowModal((prev) => ({
          ...prev,
          remainingTime: `${remainingMinutes
            .toString()
            .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`,
        }));

        if (timer && dayjs().isAfter(dayjs(apiResponse.current.qaId))) {
          clearInterval(timer);
          setShowModal({ show: false, remainingTime: "" });
        }
      }, 200);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [apiResponse.current.message]);

  const handleSubmit = async () => {
    if (!props.databaseInfo.baseDataId) {
      console.error("Base data not uploaded yet.");
      return;
    }

    if (showModal.remainingTime) {
      setShowModal((prev) => ({
        ...prev,
        show: true,
      }));
      return;
    }

    const response = await postData("/database/init", {
      ...props.databaseInfo,
    });
    if (requestState.errorMessage) {
      console.error(requestState.errorMessage);
    } else {
      console.log(response);
      apiResponse.current = {
        success: response.success,
        message: response.message,
        qaId: response.data?.qaId || null,
      };
      if (response.success && response.data.qaId) {
        updateQaId(response.data.qaId);
      }
    }
    setShowModal((prev) => ({ ...prev, show: true }));
  };

  const handleModalClose = () => {
    setShowModal((prev) => ({ ...prev, show: false }));
    if (apiResponse.current.success && apiResponse.current.qaId) {
      navigate("/qa");
    }
  };

  return (
    <>
      <AnimatePresence>
        {showModal.show && (
          <Modal
            title={apiResponse.current.success ? "成功" : "失敗"}
            onClose={() => setShowModal((prev) => ({ ...prev, show: false }))}
          >
            <p>{apiResponse.current.message}</p>
            <div className="flex justify-center items-center pt-4">
              <button
                className={cn(
                  "w-full sm:w-auto text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-lg",
                  {
                    "bg-red-500 hover:bg-red-700": !apiResponse.current.success,
                  },
                  {
                    "bg-gray-500 hover:bg-gray-700 cursor-not-allowed":
                      apiResponse.current.message ===
                      "資料庫剛被初始化完成，請間隔10分鐘後進行。",
                  }
                )}
                onClick={handleModalClose}
                disabled={
                  apiResponse.current.message ===
                  "資料庫剛被初始化完成，請間隔10分鐘後進行。"
                }
              >
                {apiResponse.current.message ===
                "資料庫剛被初始化完成，請間隔10分鐘後進行。"
                  ? showModal.remainingTime
                  : "好喔"}
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <DefaultSection {...props}>
        <div className="flex flex-col space-y-4 items-center">
          <HoverButton
            text="初始化"
            hoveredText="開始初始化"
            disabled={requestState.isFetching}
            onClick={handleSubmit}
          />
        </div>
      </DefaultSection>
    </>
  );
};

export default SubmitDatabase;
