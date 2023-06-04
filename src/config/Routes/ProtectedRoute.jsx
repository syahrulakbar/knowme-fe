import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Oval } from "react-loader-spinner";
import { refreshToken } from "../Redux/Action";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const getAccessToken = async () => {
    try {
      await dispatch(refreshToken());
      setIsAuth(true);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsAuth(false);
    }
  };
  useEffect(() => {
    getAccessToken();
  }, []);

  if (isLoading) {
    return (
      <div className="flex w-screen h-screen justify-center items-center bg-white">
        <Oval height={80} width={80} color="#145488" wrapperStyle={{}} wrapperClass="" visible={true} ariaLabel="oval-loading" secondaryColor="#7dd3fc" strokeWidth={2} strokeWidthSecondary={2} />
      </div>
    );
  }

  return isAuth ? children : <Navigate to={"/login"} />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.any,
};

export default ProtectedRoute;
