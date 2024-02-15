import axios from "axios";
import useAuthStore from "../store/auth.store"; // Import the useAuthStore hook

const useChatEngine = () => {
  const { user } = useAuthStore(); // Get the user information from useAuthStore

  const auth = async () => {
    if (user && user.username) {
      const userData = {
        username: user.username,
        secret: user.username,
        first_name: user.username,
      };

      return await new Promise((resolve, reject) => {
        axios
          .put("https://api.chatengine.io/users/", userData, {
            headers: { "Private-Key": "39b776f5-41b6-47cd-8278-16f10c521308" },
          })
          .then((res) => {
            const data = res.data;
            const result = { ...userData, data };
            resolve(result);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    } else {
      // Handle the case where user information is not available
      return Promise.reject(new Error("User information not available"));
    }
  };

  return { auth };
};

export default useChatEngine;
