import { useState } from "react";
import { useDropzone } from "react-dropzone";
import DefaultSection from "../DefaultSection";
import useHttpHandler, { initState } from "../../hooks/httpHandler";

import IconCross from "../icons/IconCross";
import IconUploadMain from "../icons/IconUploadMain";
import IconLoading from "../icons/IconLoading";
import "./UploadData.module.css";

interface DataFile {
  file: File | null;
  uploadedId: string | null;
}

interface UploadDataProps {
  targetFile: string;
  remind: string;
  title: string;
  description: string;
  onCompleted: (InfoId: string) => void;
  onCanceled: () => void;
}

const UploadData = (props: UploadDataProps) => {
  const [dataFile, setDataFile] = useState<DataFile>({
    file: null,
    uploadedId: null,
  });
  const { requestState, setRequestState, postFile } = useHttpHandler();

  const handleFileChange = async (file: File[]) => {
    setDataFile((prev) => ({ ...prev, file: file[0] }));

    const uploadUrl =
      props.targetFile === "題庫檔案"
        ? "/database/upload/base_data"
        : "/database/upload/dictionary";
    const response = await postFile(uploadUrl, file[0]);
    if (requestState.errorMessage) {
      console.error(requestState.errorMessage);
    } else {
      props.onCompleted(response.data.id);
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/*": [".csv"],
      // "application/vnd.ms-excel": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    maxSize: 10000000,
    onDrop: handleFileChange,
    onError: (error) => {
      console.error(error);
      setDataFile((prev) => ({
        ...prev,
        errorMessage: error.message || "上傳失敗",
      }));
    },
  });

  const handleCancel = () => {
    setRequestState(initState);
    setDataFile({
      file: null,
      uploadedId: null,
    });
    props.onCanceled();
  };

  return (
    <DefaultSection {...props}>
      <div className="flex flex-col space-y-4 items-center">
        {!dataFile.file && (
          <div
            {...getRootProps()}
            className="flex flex-col items-center justify-center p-4 size-40 sm:w-80 sm:h-40 border-2 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <input {...getInputProps()} />
            <IconUploadMain className="size-12 sm:size-16" stroke="#4b5563" />
            {isDragActive ? (
              <p className=" hidden sm:flex text-sm mt-2 text-gray-500">
                放開後上傳
              </p>
            ) : (
              <p className=" hidden sm:flex text-sm mt-2 text-gray-500">
                {`將 ${props.targetFile} 拖移至此`}
              </p>
            )}
          </div>
        )}
        <div className="flex flex-col w-full items-center">
          {dataFile.file && (
            <div className="flex items-center max-w-full space-x-2">
              <span
                className={
                  requestState.errorMessage
                    ? "text-red-500 truncate"
                    : "text-gray-700 dark:text-gray-500 truncate"
                }
              >
                {dataFile.file.name}
              </span>
              <span
                className={`ml-8 ${
                  requestState.errorMessage
                    ? "text-red-500"
                    : "text-gray-700 dark:text-gray-500"
                }`}
              >
                {requestState.progress}%
              </span>
              {requestState.isFetching ? (
                <IconLoading className="size-4 animate-spin" stroke="#ffffff" />
              ) : (
                <button type="button" onClick={handleCancel}>
                  <IconCross className="size-4" fill="#dc2626" />
                </button>
              )}
            </div>
          )}
          {requestState.progress && (
            <div className="flex w-2/3 h-4 overflow-hidden bg-gray-200 rounded">
              <div
                className={`transition-all progress-bar ${requestState.statusClass}`}
                style={{ width: requestState.progress + "%" }}
              />
            </div>
          )}
          {requestState.errorMessage && (
            <p className="text-red-500 text-center">
              {requestState.errorMessage}
            </p>
          )}
        </div>
        <p className="text-sm text-gray-500">
          支援格式：.csv, .xlsx
          <br />
          檔案大小上限：10MB
        </p>
      </div>
    </DefaultSection>
  );
};

export default UploadData;
