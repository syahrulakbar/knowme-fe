import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Input, Button, Gap } from "../components";
import { CiLock, AiOutlineMail, VscEye, VscEyeClosed, CgDanger } from "../utils/icon-library";
import { loginAccount } from "../config/Redux/Action";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (values) => {
    try {
      await loginAccount(values);
      formik.setSubmitting(false);
      formik.resetForm();
      navigate("/");
    } catch (error) {
      formik.setSubmitting(false);
      setErrorMessage(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: handleLogin,
  });

  return (
    <div className="flex w-full h-screen overflow-hidden p-2 dark:bg-black dark:text-white">
      <div className="hidden md:w-1/2 lg:w-2/3 md:flex justify-center items-center bg-primary-blue m-4 rounded-xl"></div>
      <div className="w-full md:w-1/2 lg:w-1/3 flex flex-wrap justify-between py-4">
        <div className="w-full text-center font-bold text-xl lg:text-2xl">
          <h1>Hello, Welcome Back!</h1>
          <h2>Know Me | Make Your Portofolio Web</h2>
        </div>
        <form className="w-full" onSubmit={formik.handleSubmit}>
          {errorMessage && (
            <div className="bg-yellow-100 text-center p-3 flex items-center justify-center gap-3 rounded-md ease-in-out duration-300">
              <CgDanger />
              <p>{errorMessage}</p>
            </div>
          )}
          <Input
            {...formik.getFieldProps("email")}
            icon={<AiOutlineMail />}
            label="Email"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            className={`pl-8 ${formik.touched.email && formik.errors.email && "bg-red-100 border-red-400 focus:border-red-400"}`}
          >
            {formik.touched.email && formik.errors.email && (
              <div className="error" role="error-message">
                {formik.errors.email}
              </div>
            )}
          </Input>
          <Gap height={20} />
          <Input
            {...formik.getFieldProps("password")}
            icon={<CiLock />}
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="*******"
            className={`pl-8 ${formik.touched.password && formik.errors.password && "bg-red-100 border-red-400 focus:border-red-400"}`}
          >
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              <Button label={showPassword ? <VscEye /> : <VscEyeClosed />} type="button" onClick={() => setShowPassword(!showPassword)} />
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="error" role="error-message">
                {formik.errors.password}
              </div>
            )}
          </Input>
          <Gap height={50} />
          <Button disabled={formik.isSubmitting} label={formik.isSubmitting ? "Loading..." : "Login"} type="submit" onSubmit={formik.handleSubmit} className="w-full text-white bg-primary-blue rounded-md text-lg py-2 px-3 font-semibold" />
          <Gap height={20} />
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
            label={"Sign Up"}
            className="dark:text-white dark:border-white w-full text-primary-black rounded-md border-2 border-primary-black text-lg py-2 px-3 font-semibold"
          />
        </form>
        <p className="flex justify-center items-end  w-full text-gray-400">Know Me</p>
      </div>
    </div>
  );
};

export default Login;
