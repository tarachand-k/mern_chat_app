import { useEffect } from "react";
import useConversation from "../../zustand/useConversations";
import { useAuthContext } from "../../contexts/AuthProvider";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import { IoIosArrowBack } from "react-icons/io";

const MessageContainer = ({ isMobileScreen }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => (!isMobileScreen ? setSelectedConversation(null) : undefined);
  }, []);

  return (
    <div className="flex-1 md:flex-none md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-gray-700 px-4 py-2 mb-2 flex items-center gap-3">
            {isMobileScreen && (
              <IoIosArrowBack
                fontSize={24}
                className="-ml-2 -mr-1 text-gray-300"
                onClick={() => setSelectedConversation(null)}
              />
            )}
            <div className="avatar online">
              <div className="w-8 rounded-full">
                <img src={selectedConversation?.profilePic} alt="user avatar" />
              </div>
            </div>
            <span className=" text-gray-300 font-bold">
              {selectedConversation.fullName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-enter sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser ? authUser.fullName : ""} </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MessageContainer;
