import { useState } from "react";
import { useDropzone } from "react-dropzone";
import DefaultSection from "../DefaultSection";

import IconCross from "../icons/IconCross";
import IconUploadMain from "../icons/IconUploadMain";

interface DataFile {
  file: File | null;
  uploadProgress: number;
  baseDataId: string | null;
  errorMessage: string | null;
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
    uploadProgress: 0,
    baseDataId: null,
    errorMessage: null,
  });

  const handleFileChange = (file: File[]) => {
    setDataFile((prev) => ({ ...prev, file: file[0] }));
    props.onCompleted(file[0].name);
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
    setDataFile({
      file: null,
      uploadProgress: 0,
      baseDataId: null,
      errorMessage: null,
    });
    props.onCanceled();
  };

  return (
    <DefaultSection {...props}>
      <div className="flex flex-col space-y-4 items-center">
        {!dataFile.file && (
          <div
            {...getRootProps()}
            className="flex flex-col items-center justify-center p-4 size-40 sm:w-80 sm:h-40 border-2 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100"
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
        {dataFile.errorMessage && (
          <p className="text-red-500 text-center">{dataFile.errorMessage}</p>
        )}
        {dataFile.file && (
          <div className="flex items-center space-x-2">
            <span>{dataFile.file.name}</span>
            <button type="button" onClick={handleCancel}>
              <IconCross className="size-4" fill="#dc2626" />
            </button>
          </div>
        )}

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
