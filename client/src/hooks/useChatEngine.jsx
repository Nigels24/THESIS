import axios from "axios";
import useAuthStore from "../store/auth.store";

const useChatEngine = () => {
  const { user } = useAuthStore();

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
            headers: { "Private-Key": "514e5567-88c7-434b-b7e3-a7f320ccd64e" },
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
      return Promise.reject(new Error("User information not available"));
    }
  };

  return { auth };
};

export default useChatEngine;
