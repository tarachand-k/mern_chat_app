import React from "react";
import useConversation from "../zustand/useConversations";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = React.useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();

      if (data.error) throw new Error(data.error);
      setMessages([...messages, data]);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return [loading, sendMessage];
};

export default useSendMessage;
