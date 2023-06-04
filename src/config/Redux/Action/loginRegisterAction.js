import Axios from "axios";
import { initSwalSuccess, initSwalError } from "../../../utils/alert-initiator";
const api = import.meta.env.VITE_API_SERVER;

export const registerAccount = async (data) => {
  try {
    await Axios.post(`${api}users/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    initSwalSuccess("Success Register");
    return Promise.resolve({
      message: "Success Register",
    });
  } catch (error) {
    const errorMessage = error?.response?.data.message;
    initSwalError(errorMessage || "failed to register");
    return Promise.reject({
      message: error,
    });
  }
};

export const loginAccount = async (data) => {
  try {
    await Axios.post(`${api}users/login`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    initSwalSuccess("Success Login");
    return Promise.resolve({
      message: "Success Login",
    });
  } catch (error) {
    const errorMessage = error.response?.data.message;
    initSwalError(errorMessage || "failed to login");
    console.error(error);
    return Promise.reject({
      message: errorMessage || "failed to login",
    });
  }
};
export const logout = async () => {
  try {
    await Axios.delete(`${api}users/logout`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    initSwalSuccess("Success Logout");
    return Promise.resolve({
      message: "Success Logout",
    });
  } catch (error) {
    const errorMessage = error.response?.data.message;
    initSwalError(errorMessage || "failed to Logout");
    console.error(error);
    return Promise.reject({
      message: errorMessage || "failed to Logout",
    });
  }
};
