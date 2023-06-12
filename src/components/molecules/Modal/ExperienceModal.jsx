import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Button, Gap, Input } from "../../atoms";
import { addExperience, getExperienceById, updateExperience } from "../../../config/Redux/Action";
import { useEffect, useState } from "react";
import moment from "moment";

const ExperienceModal = () => {
  const dispatch = useDispatch();
  const [currentWork, setCurrentWork] = useState(false);
  const { token, isUpdate } = useSelector((state) => state.globalReducer);
  const { id, experienceById } = useSelector((state) => state.experienceReducer);
  const Moment = moment().format("YYYY-MM");

  const handleSubmit = async (values) => {
    try {
      dispatch(addExperience(token, isUpdate, values));
      dispatch({ type: "TOGGLE_MODAL", payload: { isShow: false, modal: "" } });
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdate = async (values) => {
    try {
      dispatch(updateExperience({ token, isUpdate, data: values, id }));
      dispatch({ type: "TOGGLE_MODAL", payload: { isShow: false, modal: "" } });
    } catch (error) {
      console.error(error);
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: experienceById?.title || "",
      companyName: experienceById?.companyName || "",
      duration: experienceById?.duration || "",
      jobDescription: experienceById?.jobDescription || "",
      startDate: Moment,
      endDate: currentWork ? "Present" : Moment,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      companyName: Yup.string().required("Company Name is required"),
      duration: Yup.string().required("Duration is required"),
      jobDescription: Yup.string().required("Job Description is required"),
      endDate: Yup.string().test("endDate", "End date can’t be earlier than start date", (endDate, context) => {
        const { startDate } = context.parent;
        if (endDate && startDate) {
          return endDate > startDate;
        }
        return true;
      }),
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
        <h2 className="text-center font-medium text-2xl p-2">{id ? "Edit Experience" : "Add Experience"}</h2>
        <div className="flex flex-col">
          <form className="p-2 w-full" onSubmit={formik.handleSubmit}>
            <Input label="Title" name="title" id="title" type="text" {...formik.getFieldProps("title")} />
            <Gap height={20} />
            <Input label="Company Name" name="companyName" id="companyName" type="text" {...formik.getFieldProps("companyName")} />
            <Gap height={20} />
            <div className="w-full flex flex-col md:flex-row gap-2">
              <div className="w-full">
                <Input label="Start date" name="startDate" id="startDate" type="month" {...formik.getFieldProps("startDate")} />
              </div>
              <div className="w-full">
                <Input disabled={currentWork} label="End date" name="endDate" id="endDate" type={currentWork ? "text" : "month"} {...formik.getFieldProps("endDate")}>
                  {!currentWork && formik.touched.endDate && formik.errors.endDate && (
                    <div role="error-message" className="error">
                      {formik.errors.endDate}
                    </div>
                  )}
                </Input>
                <Gap height={20} />
              </div>
            </div>
            <Gap height={10} />
            <div className="w-full flex flex-row-reverse justify-start items-center gap-2">
              <label className="w-full">I am currently working in this role</label>
              <input type="checkbox" name="cbWork" id="cbWork" className="w-[2%] h-5" value={currentWork} onChange={() => setCurrentWork(!currentWork)} />
            </div>
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
