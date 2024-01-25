import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Dashboardview from "../components/Dashboardview";
import useAuthStore from "../store/auth.store";
import ChatsPage from "../realtimechat/ChatsPage"; // Correct import path
import useChatEngine from "../hooks/useChatEngine";

const Forums = () => {
  const { auth } = useChatEngine();
  const { user } = useAuthStore();

  const authenticateChatEngine = async () => {
    try {
      // Authenticate with ChatEngine
      const chatEngineUser = await auth();

      // Update the user state with ChatEngine information if needed
      // setUser(chatEngineUser); // Uncomment if needed

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
        <Sidebar />
      </div>
      <div className="basis-[88%] border h-[100vh] overflow-scroll">
        <Dashboardview />
        {/* <App />
      <AuthPage /> */}
        <ChatsPage username={user.username} /> {/* Pass the user object here */}
      </div>
    </div>
  );
};

export default Forums;
