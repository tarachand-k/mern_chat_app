import React from "react";
import { useAuthContext } from "../../contexts/AuthProvider";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const formatedTime = extractTime(message?.createdAt);
  const isShakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatClassName} `}>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${isShakeClass}`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formatedTime}
      </div>
    </div>
  );
};

export default Message;
