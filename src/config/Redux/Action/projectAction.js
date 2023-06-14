import jwtDecode from "jwt-decode";
import AxiosJWTConfig from "../../../utils/axiosJWT";
import { initSwalError, initSwalSuccess } from "../../../utils/alert-initiator";

export const addProject = (token, isUpdate, values) => async (dispatch) => {
  const formData = new FormData();
  formData.append("projectName", values.projectName);
  formData.append("descriptionProject", values.descriptionProject);
  formData.append("urlProject", values.urlProject);
  formData.append("pictureProject", values.pictureProject);
  try {
    const decoded = await jwtDecode(token);
    formData.append("userId", decoded.id);
    const axiosJWT = await dispatch(AxiosJWTConfig(decoded.exp));
    await axiosJWT.post(`projects`, formData, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    initSwalSuccess("Successfully Add Project");
    dispatch({ type: "SET_UPDATE", payload: !isUpdate });
    return Promise.resolve(true);
  } catch (error) {
    const errorMessage = error?.response?.data.message;
    initSwalError(errorMessage || error.message);
    return Promise.reject(errorMessage || error.message);
  }
};

export const deleteProject = (token, id, isUpdate) => async (dispatch) => {
  try {
    const decoded = await jwtDecode(token);
    const axiosJWT = await dispatch(AxiosJWTConfig(decoded.exp));
    await axiosJWT.delete(`projects/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    initSwalSuccess("Successfully Delete Project");
    dispatch({ type: "SET_UPDATE", payload: !isUpdate });
    return Promise.resolve(true);
  } catch (error) {
    const errorMessage = error?.response?.data.message;
    initSwalError(errorMessage || error.message);
    return Promise.reject(errorMessage || error.message);
  }
};
export const updateProject = (values) => async (dispatch) => {
  const { token, id, data, isUpdate } = values;
  const formData = new FormData();
  formData.append("projectName", data.projectName);
  formData.append("descriptionProject", data.descriptionProject);
  formData.append("urlProject", data.urlProject);
  formData.append("pictureProject", data.pictureProject);
  try {
    const decoded = await jwtDecode(token);
    formData.append("userId", decoded.id);
    const axiosJWT = await dispatch(AxiosJWTConfig(decoded.exp));
    await axiosJWT.patch(`projects/${id}`, formData, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    initSwalSuccess("Successfully Update Project");
    dispatch({ type: "SET_UPDATE", payload: !isUpdate });
    return Promise.resolve(true);
  } catch (error) {
    const errorMessage = error?.response?.data.message;
    initSwalError(errorMessage || error.message);
    return Promise.reject(errorMessage || error.message);
  }
};

export const getProjectById = (token, id) => async (dispatch) => {
  try {
    const decoded = await jwtDecode(token);
    const axiosJWT = await dispatch(AxiosJWTConfig(decoded.exp));
    const response = await axiosJWT.get(`projects/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "SET_PROJECT_ID", payload: response.data?.data });
    return Promise.resolve(response.data?.data);
  } catch (error) {
    const errorMessage = error?.response?.data.message;
    initSwalError(errorMessage || error.message);
    return Promise.reject(errorMessage || error.message);
  }
};
