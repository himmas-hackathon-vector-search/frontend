import DefaultSection from "../DefaultSection";
import HoverButton from "../ui/HoverButton";

const SubmitDatabase = ({ ...props }) => {
  return (
    <DefaultSection {...props}>
      <div className="flex flex-col space-y-4 items-center">
        <HoverButton
          text="初始化"
          hoveredText="開始初始化"
          onClick={() => {
            console.log(props.databaseInfo);
          }}
        />
      </div>
    </DefaultSection>
  );
};

export default SubmitDatabase;
