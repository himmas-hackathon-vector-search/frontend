import {
  useCallback,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { Tooltip } from "react-tooltip";
import useHttpHandler from "../../hooks/httpHandler";

import IconAsk from "../icons/IconAsk";
import dayjs from "dayjs";

interface SystemStatusProps {
  status: boolean;
  onStatus: Dispatch<SetStateAction<boolean>>;
}

const SystemStatus = ({ status, onStatus }: SystemStatusProps) => {
  const { fetchData } = useHttpHandler();
  const estimatedTime = useRef("伺服器準備中...");

  const checkingStatus = useCallback(async () => {
    const response = await fetchData("/database/status");
    if (response.success && response.data?.ready) {
      onStatus(true);
      estimatedTime.current = "伺服器已準備完成，隨時發問！";
    } else {
      onStatus(false);
      if (response.data?.qaId) {
        estimatedTime.current = `伺服器準備中...預計 ${dayjs(response.data.qaId)
          .add(5, "minutes")
          .format("HH:mm:ss")} 完成`;
      } else {
        estimatedTime.current = "伺服器準備中...";
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkingStatus();
    const timer = setInterval(() => {
      checkingStatus();
    }, 5000);

    return () => clearInterval(timer);
  }, [checkingStatus]);

  return (
    <div
      className="relative h-full"
      data-tooltip-id="remaining-time"
      data-tooltip-content={estimatedTime.current}
      data-tooltip-place="top"
    >
      <span
        className={`animate-ping absolute inline-flex size-2 rounded-full opacity-75 ${
          status ? "bg-green-400" : "bg-red-400"
        }`}
      ></span>
      <span
        className={`absolute inline-flex rounded-full size-2 ${
          status ? "bg-green-500" : "bg-red-500"
        }`}
      ></span>
      <IconAsk className="hidden size-8 sm:inline-flex dark:fill-white" />
      <Tooltip id="remaining-time" />
    </div>
  );
};

export default SystemStatus;
