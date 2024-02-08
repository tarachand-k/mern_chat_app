import React from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversations";

const useGetMessages = () => {
  const [loading, setLoading] = React.useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();

  React.useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setMessages(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation._id]);
  return [loading, messages];
};

export default useGetMessages;
