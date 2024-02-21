import React, { useEffect } from "react";
import ASidebar from "../../components/AlumniSide/ASidebar";
import AAlumniboardView from "../../components/AlumniSide/AAlumniboardView";
import ChatsPage from "../../realtimechat/ChatsPage";
import useChatEngine from "../../hooks/useChatEngine";
import useAuthStore from "../../store/auth.store";

const AForums = () => {
  const { auth } = useChatEngine();
  const { user } = useAuthStore();

  const authenticateChatEngine = async () => {
    try {
      const chatEngineUser = await auth();

      console.log("ChatEngine authenticated:", chatEngineUser);
    } catch (err) {
      console.log("Error authenticating with ChatEngine:", err);
    }
  };

  useEffect(() => {
    authenticateChatEngine();
  }, []);

  return (
    <div className="flex">
      <div className="basis-[12%] h-[100vh] border">
        <ASidebar />
      </div>
      <div className="basis-[88%] border h-[100vh] overflow-scroll">
        <AAlumniboardView />
        <div>
          <ChatsPage username={user.username} />
        </div>
      </div>
    </div>
  );
};

export default AForums;
