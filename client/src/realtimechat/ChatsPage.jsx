import React, { useEffect } from "react";
import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from "react-chat-engine-advanced";
import useAuthStore from "../store/auth.store";

const ChatsPage = ({ username }) => {
  const { user } = useAuthStore();
  const chatProps = useMultiChatLogic(
    "ebb3279b-3c34-490c-8e33-52bcba020511",
    user.username, //. Use the passed username prop
    user.username // Use the passed username prop
  );

  useEffect(() => {
    console.log("Chatspage:", user);
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow {...chatProps} style={{ height: "100%" }} />
    </div>
  );
};

export default ChatsPage;
