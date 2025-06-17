import axios from "axios";
import { getToken, removeToken, setTokenWithOption } from "./cookie";

export const baseURL =
  import.meta.env.VITE_API_URL || "/backend/api/v1";

const Axios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const AxiosFormData = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

Axios.interceptors.request.use(
  (config) => {
    const token = getToken("token");
    if (token) {
      config.headers!.Authorization = `JWT ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401 && getToken("reToken") !== null) {
      // refresh token
      refreshToken();
    }
    return Promise.reject(error);
  }
);

AxiosFormData.interceptors.request.use(
  (config) => {
    const token = getToken("token");
    if (token) {
      config.headers!.Authorization = `JWT ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosFormData.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  // gets new access token

  try {
    const response = await Axios.post(`${baseURL}/auth/token/refresh/`, {
      refresh: getToken("reToken"),
    });
      const { access } = response?.data;
      const options = { path: "/" };
      setTokenWithOption("token",access,options)
      window.location.reload();

  } catch (error) {
    removeToken("token",{path:"/"})
    removeToken("reToken",{path:"/"})
    window.location.reload();
  }
};

export default Axios;
export { AxiosFormData };