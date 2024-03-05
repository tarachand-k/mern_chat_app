import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import useConversation from "../../zustand/useConversations";

const Home = () => {
  const [isMobileScreen, setIsMobileScreen] = React.useState(true);
  const { selectedConversation } = useConversation();

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobileScreen(true);
      } else {
        setIsMobileScreen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log({ isMobileScreen });

  console.log("FROM HOME", selectedConversation);
  return (
    <div className="flex h-full w-full xsm:h-[550px] xsm:w-[450px] md:w-auto md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding  backdrop-filter backdrop-blur-3xl bg-opacity-0">
      {isMobileScreen ? (
        !selectedConversation ? (
          <Sidebar />
        ) : (
          <MessageContainer isMobileScreen={isMobileScreen} />
        )
      ) : (
        <>
          <Sidebar />
          <MessageContainer />
        </>
      )}
      {/* {isMobileScreen && !selectedConversation && <Sidebar />}
      {selectedConversation && <MessageContainer />} */}
    </div>
  );
};

export default Home;
