import Axios from "axios";
import jwtDecode from "jwt-decode";
import AxiosJWTConfig from "../../../utils/axiosJWT";
import { initSwalError } from "../../../utils/alert-initiator";
const api = import.meta.env.VITE_API_SERVER;

export const refreshToken = () => async (dispatch) => {
  try {
    const response = await Axios.get(`${api}users/token`, { withCredentials: true });
    const accessToken = response.data.accessToken;
    const decoded = jwtDecode(accessToken);
    dispatch({ type: "SET_TOKEN", payload: accessToken });
    dispatch({ type: "SET_ACCOUNT", payload: decoded });
    return Promise.resolve(response.data.accessToken);
  } catch (error) {
    const errorMessage = error.message;
    initSwalError(errorMessage);
    return Promise.reject(errorMessage);
  }
};

export const dataUser = (token) => async (dispatch) => {
  try {
    const decoded = await jwtDecode(token);
    const axiosJWT = dispatch(AxiosJWTConfig(decoded.exp));
    const response = await axiosJWT.get(`users/${decoded.id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "SET_ACCOUNT", payload: response.data.data });
    return Promise.resolve(response.data.data);
  } catch (error) {
    const errorMessage = error.message;
    initSwalError(errorMessage);
    return Promise.reject(errorMessage);
  }
};
