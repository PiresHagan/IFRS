import axios from "axios";
import { baseURL } from "./api";
import { generateUniqueRandomString } from "@utils/share";
import { getToken, setToken } from "./cookie";
import { showErrorNotification } from "@utils/errorHandler";

const PublicAxios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

PublicAxios.interceptors.request.use(
  (config) => {
    const token = getToken("userSession");
    if (token) {
      config.headers["Session-User-ID"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
PublicAxios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      generateToken();
    }
    return Promise.reject(error);
  }
);
const generateToken = () => {
  try {
    const token = generateUniqueRandomString(15);

    setToken("userSession", token);
    window.location.reload();
  } catch (error) {
    showErrorNotification(error, "Session Error", "Failed to generate user session");
  }
};

export default PublicAxios;
