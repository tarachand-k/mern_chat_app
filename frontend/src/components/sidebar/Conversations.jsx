import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";

const Conversations = () => {
  const [loading, conversations] = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading && <span className="loading loading-spinner mx-auto"></span>}
      {conversations?.map((conv, idx) => (
        <Conversation
          key={conv._id}
          conversation={conv}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
    </div>
  );
};
export default Conversations;
