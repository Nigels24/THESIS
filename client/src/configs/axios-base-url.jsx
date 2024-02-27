import axios from "axios";

const api = axios.create({
  baseURL: "http://nigel-thesis-server.jmarkdev.com",
});

export default api;
