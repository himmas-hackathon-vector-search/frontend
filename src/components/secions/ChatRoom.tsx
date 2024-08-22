import MessageSender from "../items/MessageSender";
import MessageBox from "../items/MessageBox";
import chatRoomClass from "./ChatRoom.module.css";

const ChatRoom = () => {
  return (
    <div
      className={`flex flex-col p-8 mt-4 shadow-lg rounded-md border border-gray-100 space-y-2 ${chatRoomClass.autoHeight}`}
    >
      <header>
        <h1 className="text-3xl text-black font-bold text-center">
          Question & Answer
        </h1>
      </header>
      <MessageBox />
      <MessageSender />
    </div>
  );
};

export default ChatRoom;
