import jwtDecode from "jwt-decode";
import AxiosJWTConfig from "../../../utils/axiosJWT";
import { initSwalError, initSwalSuccess } from "../../../utils/alert-initiator";

export const addSkills = (token, isUpdate, data) => async (dispatch) => {
  try {
    const decoded = await jwtDecode(token);
    const axiosJWT = await dispatch(AxiosJWTConfig(decoded.exp));
    await axiosJWT.post(
      `skills`,
      { ...data, userId: decoded.id },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    initSwalSuccess("Successfully Add Skills");
    dispatch({ type: "SET_UPDATE", payload: !isUpdate });
    return Promise.resolve(true);
  } catch (error) {
    const errorMessage = error?.response?.data.message;
    initSwalError(errorMessage || error.message);
    return Promise.reject(errorMessage || error.message);
  }
};

export const deleteSkills = (token, id, isUpdate) => async (dispatch) => {
  try {
    const decoded = await jwtDecode(token);
    const axiosJWT = await dispatch(AxiosJWTConfig(decoded.exp));
    await axiosJWT.delete(`skills/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    initSwalSuccess("Successfully Delete Skills");
    dispatch({ type: "SET_UPDATE", payload: !isUpdate });
    return Promise.resolve(true);
  } catch (error) {
    const errorMessage = error?.response?.data.message;
    initSwalError(errorMessage || error.message);
    return Promise.reject(errorMessage || error.message);
  }
};

export const getSkillById = (token, id) => async (dispatch) => {
  try {
    const decoded = await jwtDecode(token);
    const axiosJWT = await dispatch(AxiosJWTConfig(decoded.exp));
    const response = await axiosJWT.get(`skills/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await dispatch({ type: "SET_SKILL_ID", payload: response.data?.data });
    return Promise.resolve(response.data?.data);
  } catch (error) {
    const errorMessage = error?.response?.data.message;
    initSwalError(errorMessage || error.message);
    return Promise.reject(errorMessage || error.message);
  }
};

export const updateSkills = (values) => async (dispatch) => {
  const { token, id, data, isUpdate } = values;
  try {
    const decoded = await jwtDecode(token);
    const axiosJWT = await dispatch(AxiosJWTConfig(decoded.exp));
    await axiosJWT.patch(`skills/${id}`, data, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    initSwalSuccess("Successfully Update Skills");
    dispatch({ type: "SET_UPDATE", payload: !isUpdate });
    return Promise.resolve(true);
  } catch (error) {
    const errorMessage = error?.response?.data.message;
    initSwalError(errorMessage || error.message);
    return Promise.reject(errorMessage || error.message);
  }
};
