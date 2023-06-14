import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Gap, Input } from "../../index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addSkills, getSkillById, updateSkills } from "../../../config/Redux/Action";
import { initSwalError } from "../../../utils/alert-initiator";
import { IoMdAdd, RiDeleteBin5Line } from "../../../utils/icon-library";
import _ from "lodash";

const SkillsModal = () => {
  const dispatch = useDispatch();
  const [detailSkills, setDetailSkills] = useState([{ basic: "" }]);
  const { token, isUpdate, account } = useSelector((state) => state.globalReducer);
  const { skillById, id } = useSelector((state) => state.skillReducer);
  const { skills } = account;

  const labelCategory = ["Android Developement", "Web Developement", "Framework", "Database", "Version Control System"];
  const uniqueCategories = _.difference(
    labelCategory,
    skills?.map((item) => item.categorySkills)
  );

  const handleChangeCategory = (event) => {
    const value = event.target.value;
    formik.setFieldValue("categorySkills", value);
  };

  const handleSubmit = async (values) => {
    const data = {
      categorySkills: values.categorySkills,
      detailSkills: JSON.stringify(detailSkills.filter((item) => Object.values(item)[0] !== "")),
    };
    try {
      dispatch(addSkills(token, isUpdate, data));
      dispatch({ type: "TOGGLE_MODAL", payload: { isShow: false, modal: "" } });
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdate = async (values) => {
    const data = {
      categorySkills: values.categorySkills,
      detailSkills: JSON.stringify(detailSkills.filter((item) => Object.values(item)[0] !== "")),
    };
    try {
      dispatch(updateSkills({ id, token, data, isUpdate }));
      dispatch({ type: "TOGGLE_MODAL", payload: { isShow: false, modal: "" } });
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      categorySkills: skillById?.categorySkills || uniqueCategories[0],
    },
    validationSchema: Yup.object({
      categorySkills: Yup.string().required("Category Skills is required"),
    }),
    onSubmit: id ? handleUpdate : handleSubmit,
  });

  const handleAddSkills = () => {
    setDetailSkills([{ basic: "" }, ...detailSkills]);
  };

  const handleChangeSkills = (event, index) => {
    const { value } = event.target;
    setDetailSkills((prevSkills) => {
      const updatedSkills = [...prevSkills];
      updatedSkills[index] = { [value]: Object.values(updatedSkills[index]) };
      return updatedSkills;
    });
  };

  const handleDeleteSkill = (event, index) => {
    event.preventDefault();
    const list = [...detailSkills];
    if (list.length <= 1) return initSwalError("At least one skill");
    list.splice(index, 1);
    setDetailSkills(list);
  };

  const handleChangeInputSkill = (event, index) => {
    const { value } = event.target;
    setDetailSkills((prevSkills) => {
      const updatedSkills = [...prevSkills];
      const selectedSkills = Object.keys(updatedSkills[index])[0];
      updatedSkills[index] = { [selectedSkills]: value };
      return updatedSkills;
    });
  };

  const handleCloseModal = (event) => {
    event.preventDefault();
    dispatch({ type: "TOGGLE_MODAL", payload: { isShow: false, modal: "" } });
  };

  const fetchSkill = async (token, id) => {
    await dispatch(getSkillById(token, id))
      .then((response) => {
        response && setDetailSkills(response?.detailSkills);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    if (id) {
      fetchSkill(token, id);
    }
  }, [id]);

  return (
    <>
      <div className="w-[80%] max-h-[95vh] md:max-h-max  bg-white text-black dark:text-white dark:bg-black rounded-lg  z-10 overflow-y-auto p-2">
        <h2 className="text-center font-medium text-2xl p-2">Add Skills</h2>
        <div className="flex flex-col md:flex-row">
          <form className="p-2 w-full" onSubmit={formik.handleSubmit}>
            <label htmlFor="categorySkills">Category Skills</label>
            <div className="w-full">
              <select
                disabled={id}
                value={formik.values.categorySkills}
                onChange={handleChangeCategory}
                name="categorySkills"
                id="categorySkills"
                className="w-full text-black font-medium h-10 rounded-md bg-gray-200 disabled:cursor-not-allowed"
              >
                {(id ? labelCategory : uniqueCategories)?.map((item, id) => (
                  <option key={id} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <Gap height={20} />
            <label htmlFor="skills">Your Skills</label>
            <div className="w-full h-28 overflow-x-auto">
              {detailSkills?.map((item, index) => (
                <div key={index} className="w-full flex gap-2 flex-row  my-2">
                  <div className="flex flex-col md:flex-row w-5/6 md:w-[95%] gap-2">
                    <select onChange={(event) => handleChangeSkills(event, index)} value={Object.keys(item)[0]} name="skills" id="skills" className="text-black font-medium h-10 rounded-md bg-gray-200">
                      <option value="basic">Basic</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="expert">Expert</option>
                    </select>
                    <Input value={Object.values(item)[0]} type="text" onChange={(event) => handleChangeInputSkill(event, index)} />
                  </div>
                  <Button type="button" onClick={(event) => handleDeleteSkill(event, index)} className="text-red-600 ">
                    <RiDeleteBin5Line size={20} />
                  </Button>
                </div>
              ))}
            </div>
            <Gap height={10} />
            <Button label="Add Skills" type="button" onClick={handleAddSkills} className=" flex gap-2 flex-row-reverse  items-center bg-sky-100  text-blue-700 p-1 rounded-md">
              <IoMdAdd size={15} />
            </Button>
            <Gap height={30} />
          </form>
        </div>
        <div className="w-full flex flex-col-reverse md:flex-row justify-center gap-2">
          <Button
            disabled={formik.isSubmitting}
            label="Cancel"
            className=" dark:text-white dark:border-white w-full text-primary-black  rounded-md border-2 border-primary-black text-lg p-2 font-semibold"
            type="button"
            onClick={(event) => handleCloseModal(event)}
          />
          <Button
            disabled={formik.isSubmitting}
            label={formik.isSubmitting ? "Loading..." : "Update"}
            className="bg-primary-blue dark:text-white  w-full text-white rounded-md  text-lg p-2 font-semibold"
            type="button"
            onClick={formik.handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default SkillsModal;
