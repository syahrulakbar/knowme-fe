import jwtDecode from "jwt-decode";
import AxiosJWTConfig from "../../../utils/axiosJWT";
import { initSwalError, initSwalSuccess } from "../../../utils/alert-initiator";

export const addCertificate = (token, isUpdate, data) => async (dispatch) => {
  try {
    const decoded = await jwtDecode(token);
    const axiosJWT = await dispatch(AxiosJWTConfig(decoded.exp));
    await axiosJWT.post(
      `certificate`,
      { ...data, userId: decoded.id },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    initSwalSuccess("Successfully Add Certificate");
    dispatch({ type: "SET_UPDATE", payload: !isUpdate });
    return Promise.resolve(true);
  } catch (error) {
    const errorMessage = error?.response?.data.message;
    initSwalError(errorMessage || error.message);
    return Promise.reject(errorMessage || error.message);
  }
};

export const deleteCertificate = (token, id, isUpdate) => async (dispatch) => {
  try {
    const decoded = await jwtDecode(token);
    const axiosJWT = await dispatch(AxiosJWTConfig(decoded.exp));
    await axiosJWT.delete(`certificate/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    initSwalSuccess("Successfully Delete Certificate");
    dispatch({ type: "SET_UPDATE", payload: !isUpdate });
    return Promise.resolve(true);
  } catch (error) {
    const errorMessage = error?.response?.data.message;
    initSwalError(errorMessage || error.message);
    return Promise.reject(errorMessage || error.message);
  }
};

export const updateCertificate = (data) => async (dispatch) => {
  const { token, id, values, isUpdate } = data;
  try {
    const decoded = await jwtDecode(token);
    const axiosJWT = await dispatch(AxiosJWTConfig(decoded.exp));
    await axiosJWT.patch(`certificate/${id}`, values, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    initSwalSuccess("Successfully Update Certificate");
    dispatch({ type: "SET_UPDATE", payload: !isUpdate });
    return Promise.resolve(true);
  } catch (error) {
    const errorMessage = error?.response?.data.message;
    initSwalError(errorMessage || error.message);
    return Promise.reject(errorMessage || error.message);
  }
};

export const getCertificateById = (token, id) => async (dispatch) => {
  try {
    const decoded = await jwtDecode(token);
    const axiosJWT = await dispatch(AxiosJWTConfig(decoded.exp));
    const response = await axiosJWT.get(`certificate/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "SET_CERTIFICATE_ID", payload: response.data?.data });
    return Promise.resolve(true);
  } catch (error) {
    const errorMessage = error?.response?.data.message;
    initSwalError(errorMessage || error.message);
    return Promise.reject(errorMessage || error.message);
  }
};
