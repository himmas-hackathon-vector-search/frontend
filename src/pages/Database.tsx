import { useState } from "react";
import SubmitDatabase from "../components/secions/SubmitDatabase";
import UploadData from "../components/secions/UploadData";

interface databaseInitBy {
  data: string | null;
  dictionary: string | null;
}

const DatabasePage = () => {
  const [databaseInfo, setDatabaseInfo] = useState<databaseInitBy>({
    data: null,
    dictionary: null,
  });

  return (
    <>
      <UploadData
        targetFile="題庫檔案"
        remind="step 1"
        title="上傳題庫"
        description="上傳你的問答題庫，包含預期的問題與其正確答案。
        AI會針對新的問題尋找最貼切的答案來回答。"
        onCompleted={(dataId: string) =>
          setDatabaseInfo((prev) => ({ ...prev, data: dataId }))
        }
        onCanceled={() => setDatabaseInfo({ data: null, dictionary: null })}
      />
      {databaseInfo.data && (
        <>
          <UploadData
            targetFile="字典檔案"
            remind="(option) step2"
            title="上傳字典"
            description="字典可以幫助AI再遇到問題時更準確地找到適合的回答。"
            onCompleted={(dictionaryId: string) =>
              setDatabaseInfo((prev) => ({ ...prev, dictionary: dictionaryId }))
            }
            onCanceled={() =>
              setDatabaseInfo((prev) => ({ ...prev, dictionary: null }))
            }
          />
          <SubmitDatabase
            remind="step 3"
            title="初始化資料庫"
            description="開始初始化屬於你的問答題庫吧！"
            databaseInfo={databaseInfo}
          />
        </>
      )}
    </>
  );
};

export default DatabasePage;
