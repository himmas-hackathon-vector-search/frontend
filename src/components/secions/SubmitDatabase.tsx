import { motion } from "framer-motion";
import DefaultSection from "../DefaultSection";
import HoverButton from "../ui/HoverButton";
import useHttpHandler from "../../hooks/httpHandler";

interface SubmitDatabaseProps {
  remind: string;
  title: string;
  description: string;
  databaseInfo: {
    baseDataId: string | null;
    dictionaryId: string | null;
  };
}

const SubmitDatabase = (props: SubmitDatabaseProps) => {
  const { requestState, postData } = useHttpHandler();

  const handleSubmit = async () => {
    if (!props.databaseInfo.baseDataId) {
      console.error("Base data not uploaded yet.");
      return;
    }

    const response = await postData("/database/init", {
      ...props.databaseInfo,
    });
    if (requestState.errorMessage) {
      console.error(requestState.errorMessage);
    } else {
      console.log(response);
      localStorage.setItem("qaId", response.data.qaId);
    }
  };

  return (
    <DefaultSection {...props}>
      <motion.div
        className="flex flex-col space-y-4 items-center"
        whileHover={{ scale: 1.1 }}
      >
        <HoverButton
          text="初始化"
          hoveredText="開始初始化"
          disabled={requestState.isFetching}
          onClick={handleSubmit}
        />
      </motion.div>
    </DefaultSection>
  );
};

export default SubmitDatabase;
