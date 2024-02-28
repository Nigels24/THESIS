import axios from "axios";

const api = axios.create({
  baseURL: "https://nigel-thesis-server.jmarkdev.com",
});

export default api;
