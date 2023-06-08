import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Button, Gap, Input } from "../../atoms";
import { addExperience, getExperienceById, updateExperience } from "../../../config/Redux/Action";
import { useEffect } from "react";

const ExperienceModal = () => {
  const dispatch = useDispatch();
  const { token, isUpdate } = useSelector((state) => state.globalReducer);
  const { id, experienceById } = useSelector((state) => state.experienceReducer);

  const handleSubmit = async (values) => {
    try {
      dispatch(addExperience(token, isUpdate, values));
      dispatch({ type: "TOGGLE_MODAL", payload: { isShow: false, modal: "" } });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (values) => {
    try {
      dispatch(updateExperience({ token, isUpdate, data: values, id }));
      dispatch({ type: "TOGGLE_MODAL", payload: { isShow: false, modal: "" } });
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: experienceById?.title || "",
      companyName: experienceById?.companyName || "",
      duration: experienceById?.duration || "",
      jobDescription: experienceById?.jobDescription || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      companyName: Yup.string().required("Company Name is required"),
      duration: Yup.string().required("Duration is required"),
      jobDescription: Yup.string().required("Job Description is required"),
    }),
    onSubmit: id ? handleUpdate : handleSubmit,
  });
  const handleCloseModal = (event) => {
    event.preventDefault();
    dispatch({ type: "TOGGLE_MODAL", payload: { isShow: false, modal: "" } });
  };

  useEffect(() => {
    if (id) {
      dispatch(getExperienceById(token, id));
    }
    return () => {
      dispatch({ type: "SET_EXPERIENCE_ID", payload: [] });
    };
  }, [id, dispatch, token]);

  return (
    <>
      <div className="w-[80%] max-h-[95vh] md:max-h-max  bg-white text-black dark:text-white dark:bg-black rounded-lg  z-10 overflow-y-auto p-2">
        <h2 className="text-center font-medium text-2xl p-2">Add Experience</h2>
        <div className="flex flex-col">
          <form className="p-2 w-full" onSubmit={formik.handleSubmit}>
            <Input label="Title" name="title" id="title" type="text" {...formik.getFieldProps("title")} />
            <Gap height={20} />
            <Input label="Company Name" name="companyName" id="companyName" type="text" {...formik.getFieldProps("companyName")} />
            <Gap height={20} />
            <Input label="Duration" name="duration" id="duration" type="text" {...formik.getFieldProps("duration")} />
            <Gap height={20} />
            <Input label="Job Description" name="jobDescription" id="jobDescription" type="text" {...formik.getFieldProps("jobDescription")} />
            <Gap height={30} />
            <div className="w-full flex flex-col-reverse md:flex-row justify-center gap-2">
              <Button
                disabled={formik.isSubmitting}
                label="Cancel"
                className=" dark:text-white dark:border-white w-full text-primary-black  rounded-md border-2 border-primary-black text-lg p-2 font-semibold"
                type="button"
                onClick={handleCloseModal}
              />
              <Button
                disabled={formik.isSubmitting}
                label={formik.isSubmitting ? "Loading..." : "Save"}
                className="bg-primary-blue dark:text-white  w-full text-white rounded-md  text-lg p-2 font-semibold"
                type="submit"
                onSubmit={formik.handleSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ExperienceModal;
