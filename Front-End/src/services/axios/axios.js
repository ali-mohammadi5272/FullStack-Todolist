import axios from "axios";
import { toast } from "react-toastify";

const axiosRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosRequest.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    console.log(err);
    toast.error(err.response.data.message);
    return Promise.reject(err);
  }
);

axiosRequest.interceptors.response.use(
  (response) => {
    toast.success(response.data.message);
    return response;
  },
  (err) => {
    if (err.code === "ERR_NETWORK") {
      toast.error(err.message);
    } else {
      toast.error(err.response.data.message);
    }
    return Promise.reject(err);
  }
);

export default axiosRequest;
