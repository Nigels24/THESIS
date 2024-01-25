import { useState } from "react";

import "../App.css";

import AuthPage from "../realtimechat/AuthPage";
import ChatsPage from "../realtimechat/ChatsPage";

function App() {
  const [user, setUser] = useState(undefined);

  if (!user) {
    return <AuthPage onAuth={(user) => setUser(user)} />;
  } else {
    return <ChatsPage user={user} />;
  }
}

export default App;
