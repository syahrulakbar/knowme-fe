import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Gap, Input } from "../../index";
import { useDispatch, useSelector } from "react-redux";
import { getProjectById, updateProject } from "../../../config/Redux/Action";
import { AiFillCamera } from "../../../utils/icon-library";
import { addProject } from "../../../config/Redux/Action";

const ProjectModal = () => {
  const [imgPreview, setImgPreview] = useState(null);
  const dispatch = useDispatch();
  const { token, isUpdate } = useSelector((state) => state.globalReducer);
  const { id, projectById } = useSelector((state) => state.projectReducer);

  const handleSubmit = async (values) => {
    try {
      dispatch(addProject(token, isUpdate, values));
      dispatch({ type: "TOGGLE_MODAL", payload: { isShow: false, modal: "" } });
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdate = async (values) => {
    try {
      dispatch(updateProject({ token, id, data: values, isUpdate }));
      dispatch({ type: "TOGGLE_MODAL", payload: { isShow: false, modal: "" } });
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectName: projectById.projectName || "",
      descriptionProject: projectById.descriptionProject || "",
      urlProject: projectById.urlProject || "",
      pictureProject: projectById.pictureProject || null,
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required("Project Name is required"),
      descriptionProject: Yup.string().required("Description Project is required"),
      urlProject: Yup.string().required("URL Project is required"),
      pictureProject: Yup.mixed()
        .test("fileSize", "Image size maks 3 MB", (value) => {
          if (value.size) {
            const maxSize = 3 * 1024 * 1024;
            return value.size <= maxSize;
          }
          return true;
        })
        .test("imageType", "Only image files are allowed", (value) => {
          if (value.type) {
            const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
            return allowedTypes.includes(value.type);
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

  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("pictureProject", file);
    setImgPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const response = await dispatch(getProjectById(token, id));
          response && setImgPreview(`http://localhost:3000/assets/${response.pictureProject}`);
        } catch (error) {
          console.error(error);
        }
      };
      fetchProject();
    }
    return () => {
      dispatch({ type: "SET_PROJECT_ID", payload: {} });
    };
  }, [id]);

  return (
    <>
      <div className="w-[80%] max-h-[95vh] md:max-h-max  bg-white text-black dark:text-white dark:bg-black rounded-lg  z-10 overflow-y-auto p-2">
        <h2 className="text-center font-medium text-2xl p-2">{id ? "Edit Project" : "Add Project"}</h2>
        <div className="flex flex-col md:flex-row">
          <form className="certificate p-2 w-full" onSubmit={formik.handleSubmit}>
            <div className="w-full flex flex-col justify-center">
              <div className="relative w-full h-[200px]">
                <div className="w-full border h-[200px] rounded-md absolute">
                  <div className="w-full h-full flex justify-center items-center">
                    <AiFillCamera size={30} />
                  </div>
                </div>
                {imgPreview && <img loading="lazy" className="object-cover object-center absolute inset-0 w-full h-full p-1 border rounded-md" src={imgPreview} alt="Bordered avatar" />}
                <Input accept="image/*" id="pictureProject" name="pictureProject" type="file" className="absolute z-10 p-0 h-[200px] opacity-0 cursor-pointer" onChange={(event) => handleChangeImage(event)} />
              </div>
              {formik.errors.pictureProject && <p className="text-red-500 text-xs">{formik.errors.pictureProject}</p>}
            </div>
            <Gap height={20} />
            <Input label="Project Name" placeholder="Ex: Portofolio Website" {...formik.getFieldProps("projectName")} />
            <Gap height={20} />
            <Input label="Description Project" placeholder="Description your project" {...formik.getFieldProps("descriptionProject")} />
            <Gap height={20} />
            <Input label="URL Project" placeholder="Your URL Project" {...formik.getFieldProps("urlProject")} />
            <Gap height={30} />
            <div className="w-full flex flex-col-reverse md:flex-row justify-center gap-2">
              <Button
                disabled={formik.isSubmitting}
                label="Cancel"
                className=" dark:text-white dark:border-white w-full text-primary-black  rounded-md border-2 border-primary-black text-lg p-2 font-semibold"
                type="button"
                onClick={(event) => handleCloseModal(event)}
              />
              <Button disabled={formik.isSubmitting} label={formik.isSubmitting ? "Loading..." : "Update"} className="bg-primary-blue dark:text-white  w-full text-white rounded-md  text-lg p-2 font-semibold" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProjectModal;
