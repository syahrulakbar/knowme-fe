import Axios from "axios";
import jwtDecode from "jwt-decode";
import AxiosJWTConfig from "../../../utils/axiosJWT";
import { initSwalError, initSwalSuccess } from "../../../utils/alert-initiator";
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
    const axiosJWT = await dispatch(AxiosJWTConfig(decoded.exp));
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
export const updateUser = (token, isUpdate, formData) => async (dispatch) => {
  try {
    const decoded = await jwtDecode(token);
    const axiosJWT = await dispatch(AxiosJWTConfig(decoded.exp));
    await axiosJWT.patch(`users/${decoded.id}`, formData, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    initSwalSuccess("Successfully Update Profile");
    dispatch({ type: "SET_UPDATE", payload: !isUpdate });
    return Promise.resolve(true);
  } catch (error) {
    const errorMessage = error?.response?.data.message;
    initSwalError(errorMessage || error.message);
    return Promise.reject(errorMessage || error.message);
  }
};
