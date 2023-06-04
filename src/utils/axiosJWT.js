import axios from "axios";
import jwtDecode from "jwt-decode";

const AxiosJWTConfig = (expire) => (dispatch) => {
  const api = import.meta.env.VITE_API_SERVER;
  const axiosJWT = axios.create({
    baseURL: api,
  });

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axiosJWT.get("v1/users/token");
        const accessToken = response.data.accessToken;
        config.headers.Authorization = `Bearer ${accessToken}`;
        const decoded = jwtDecode(accessToken);
        dispatch({ type: "SET_TOKEN", payload: accessToken });
        dispatch({ type: "SET_ACCOUNT", payload: decoded });
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosJWT;
};

export default AxiosJWTConfig;
