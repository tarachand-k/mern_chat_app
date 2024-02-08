import React from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessagesSkeleton from "../../skeletons/MessagesSkeleton";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const [loading, messages] = useGetMessages();
  const lastMessageRef = React.useRef();
  useListenMessages();

  React.useEffect(() => {
    setTimeout(() => {
      lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  console.log({ messages });
  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && <MessagesSkeleton />}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
    </div>
  );
};
export default Messages;
