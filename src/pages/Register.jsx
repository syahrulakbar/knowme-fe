import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button, Gap } from "../components";
import { CiLock, AiOutlineMail, VscEye, VscEyeClosed } from "../utils/icon-library";
import { registerAccount } from "../config/Redux/Action";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (values) => {
    try {
      await registerAccount(values);
      formik.setSubmitting(false);
      formik.resetForm();
      navigate("/login");
    } catch (error) {
      console.error(error);
      formik.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "name must be at least 3 characters").max(50, "Max 50 Characters").required("Name is required"),
      email: Yup.string().email("Invalid Email").required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/g, "Should contain at least 1 lowercase")
        .matches(/[A-Z]/g, "Should contain at least 1 uppercase")
        .matches(/[0-8]/g, "Should contain at least 1 number")
        .matches(/[@$!%*#?&]/g, "Should contain at least 1 special characters")
        .matches(/^\S*$/g, "Should not contain spaces")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: handleRegister,
  });

  return (
    <div className="flex w-full h-screen overflow-hidden p-2 dark:bg-black dark:text-white">
      <div className="hidden md:w-1/2 lg:w-2/3 md:flex justify-center items-center bg-primary-blue m-4 rounded-xl"></div>
      <div className="w-full md:w-1/2 lg:w-1/3 flex flex-wrap justify-between py-4">
        <div className="w-full text-center font-bold text-xl lg:text-2xl">
          <h1 id="title">Create Account</h1>
          <h2>Know Me | Make Your Portofolio</h2>
        </div>
        <form className="w-full" onSubmit={formik.handleSubmit}>
          <Input
            {...formik.getFieldProps("name")}
            icon={<AiOutlineMail />}
            label="Name"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className={`pl-8 ${formik.touched.name && formik.errors.name && "bg-red-100 border-red-400 focus:border-red-400"}`}
          >
            {formik.touched.name && formik.errors.name && (
              <div role="error-message" className="error">
                {formik.errors.name}
              </div>
            )}
          </Input>
          <Gap height={20} />
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
              <div role="error-message" className="error">
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
              <div role="error-message" className="error">
                {formik.errors.password}
              </div>
            )}
          </Input>
          <Gap height={20} />
          <Input
            {...formik.getFieldProps("confirmPassword")}
            icon={<CiLock />}
            type="password"
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            placeholder="*******"
            className={`pl-8 ${formik.touched.confirmPassword && formik.errors.confirmPassword && "bg-red-100 border-red-400 focus:border-red-400"}`}
          >
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div role="error-message" className="error">
                {formik.errors.confirmPassword}
              </div>
            )}
          </Input>
          <Gap height={50} />
          <Button disabled={formik.isSubmitting} type="submit" label={formik.isSubmitting ? "Loading..." : "Register"} className="w-full text-white bg-primary-blue rounded-md text-lg py-2 px-3 font-semibold" />
          <Gap height={20} />
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
            label={"Sign In"}
            className="dark:text-white dark:border-white w-full text-primary-black rounded-md border-2 border-primary-black text-lg py-2 px-3 font-semibold"
          />
        </form>
        <p className="flex justify-center items-end  w-full text-gray-400">Know Me</p>
      </div>
    </div>
  );
};

export default Register;
