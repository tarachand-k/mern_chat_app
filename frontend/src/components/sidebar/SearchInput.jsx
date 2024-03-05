import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversations";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = React.useState("");
  const { setSelectedConversation } = useConversation();
  const [loading, conversations] = useGetConversations();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found");
  };

  return (
    <form onSubmit={handleSubmit} className=" w-full flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="input input-bordered rounded-full flex-grow"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
