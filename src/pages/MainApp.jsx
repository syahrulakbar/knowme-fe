import { Route, Routes } from "react-router-dom";
import { Layout } from "../components";
import { Certificate, Experience, Skills, Projects } from "../pages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { dataUser } from "../config/Redux/Action";

function MainApp() {
  const { token, isUpdate } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  const getDataUser = async () => {
    try {
      await dispatch(dataUser(token));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getDataUser();
  }, [isUpdate]);
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Experience />} />
        <Route exact path="/certificate" element={<Certificate />} />
        <Route exact path="/project" element={<Projects />} />
        <Route exact path="/skill" element={<Skills />} />
        <Route exact path="/*" element={<Projects />} />
      </Routes>
    </Layout>
  );
}

export default MainApp;
