import jwtDecode from "jwt-decode";
import AxiosJWTConfig from "../../../utils/axiosJWT";
import { initSwalError, initSwalSuccess } from "../../../utils/alert-initiator";

export const addExperience = (token, isUpdate, data) => async (dispatch) => {
  try {
    const decoded = await jwtDecode(token);
    const axiosJWT = await dispatch(AxiosJWTConfig(decoded.exp));
    await axiosJWT.post(
      `experience`,
      { ...data, userId: decoded.id },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    initSwalSuccess("Successfully Add Experience");
    dispatch({ type: "SET_UPDATE", payload: !isUpdate });
    return Promise.resolve(true);
  } catch (error) {
    const errorMessage = error?.response?.data.message;
    initSwalError(errorMessage || error.message);
    return Promise.reject(errorMessage || error.message);
  }
};
export const getAllExperience = (token) => async (dispatch) => {
  try {
    const decoded = await jwtDecode(token);
    const axiosJWT = await dispatch(AxiosJWTConfig(decoded.exp));
    const response = await axiosJWT.get(`experience/user/${decoded.id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "SET_EXPERIENCE", payload: response.data?.data });
    return Promise.resolve(true);
  } catch (error) {
    const errorMessage = error?.response?.data.message;
    initSwalError(errorMessage || error.message);
    return Promise.reject(errorMessage || error.message);
  }
};
export const getExperienceById = (token, id) => async (dispatch) => {
  try {
    const decoded = await jwtDecode(token);
    const axiosJWT = await dispatch(AxiosJWTConfig(decoded.exp));
    const response = await axiosJWT.get(`experience/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "SET_EXPERIENCE_ID", payload: response.data?.data });
    return Promise.resolve(true);
  } catch (error) {
    const errorMessage = error?.response?.data.message;
    initSwalError(errorMessage || error.message);
    return Promise.reject(errorMessage || error.message);
  }
};
export const deleteExperience = (token, id, isUpdate) => async (dispatch) => {
  try {
    const decoded = await jwtDecode(token);
    const axiosJWT = await dispatch(AxiosJWTConfig(decoded.exp));
    await axiosJWT.delete(`experience/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    initSwalSuccess("Successfully Delete Experience");
    dispatch({ type: "SET_UPDATE", payload: !isUpdate });
    return Promise.resolve(true);
  } catch (error) {
    const errorMessage = error?.response?.data.message;
    initSwalError(errorMessage || error.message);
    return Promise.reject(errorMessage || error.message);
  }
};
export const updateExperience = (values) => async (dispatch) => {
  const { token, id, data, isUpdate } = values;
  try {
    const decoded = await jwtDecode(token);
    const axiosJWT = await dispatch(AxiosJWTConfig(decoded.exp));
    await axiosJWT.patch(`experience/${id}`, data, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    initSwalSuccess("Successfully Update Experience");
    dispatch({ type: "SET_UPDATE", payload: !isUpdate });
    return Promise.resolve(true);
  } catch (error) {
    const errorMessage = error?.response?.data.message;
    initSwalError(errorMessage || error.message);
    return Promise.reject(errorMessage || error.message);
  }
};
