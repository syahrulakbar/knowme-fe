import { useDispatch, useSelector } from "react-redux";
import { Button, Gap } from "../components";
import { useEffect } from "react";
import { deleteExperience, getAllExperience } from "../config/Redux/Action";
import { RiDeleteBin5Line, BiPencil } from "../utils/icon-library";

const Experience = () => {
  const dispatch = useDispatch();
  const { token, isUpdate } = useSelector((state) => state.globalReducer);
  const { experience } = useSelector((state) => state.experienceReducer);
  const handleShowModal = (event, id) => {
    event.preventDefault();
    dispatch({ type: "TOGGLE_MODAL", payload: { isShow: true, modal: "experience" } });
    dispatch({ type: "UPDATE_EXPERIENCE", payload: id || "" });
  };
  const getExperiences = async () => {
    try {
      dispatch(getAllExperience(token));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteExperience = (event, id) => {
    event.preventDefault();
    try {
      dispatch(deleteExperience(token, id, isUpdate));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getExperiences();
  }, [isUpdate]);

  return (
    <>
      <Gap height={10} />
      <div className="w-full flex justify-end">
        <Button onClick={handleShowModal} label="Add Experience" className="font-medium bg-gray-200 text-primary-black dark:bg-white dark:text-black p-2 rounded-lg" />
      </div>
      <div id="experience" className="container mx-auto mt-10">
        <div className="education-section w-full flex justify-center items-center">
          <div className="education-content-1">
            {experience.map((data, id, arr) => (
              <div key={id} className="w-[90%] education-data grid grid-cols-1 mb-5 xl:mb-0 xl:grid-cols-[500px_max-content_500px] gap-0 xl:gap-6  ">
                {(id + 1) % 2 !== 0 && (
                  <>
                    <div></div>
                    <div>
                      <span className="education-rounder hidden xl:inline-block bg-sky-400"></span>
                      {id + 1 !== arr.length && <span className="education-line translate-x-[6px] -translate-y-[7px] hidden xl:block w-[2px] h-full bg-sky-400"></span>}
                    </div>
                  </>
                )}
                <div className={` bg-white text-black dark:bg-slate-900 dark:text-white shadow-md p-5 shadow-sky-400 rounded-lg`}>
                  <div className="w-full flex flex-row justify-between">
                    <h2 className="education-title font-semibold text-lg">{data.title}</h2>
                    <div className="flex flex-row gap-2">
                      <Button onClick={(event) => handleShowModal(event, data.id)} className=" dark:text-white">
                        <BiPencil size={25} />
                      </Button>
                      <Button onClick={(event) => handleDeleteExperience(event, data.id)} className="text-red-500">
                        <RiDeleteBin5Line size={25} />
                      </Button>
                    </div>
                  </div>
                  <h2 className="education-subtitle inline-block mb-1">{data.companyName}</h2>
                  <p className="education-calender font-medium text-slate-700 dark:text-slate-400 mb-1">{`📆 ${data.duration}`}</p>
                  <ul className="font-light text-sm pl-5 list-disc">
                    <li>{data.jobDescription}</li>
                  </ul>
                </div>
                {(id + 1) % 2 === 0 && id + 1 !== arr.length && (
                  <div>
                    <span className="education-rounder  hidden xl:inline-block bg-sky-400"></span>
                    <span className="education-line translate-x-[6px] -translate-y-[7px] hidden xl:block w-[2px] h-full bg-sky-400"></span>
                  </div>
                )}
                {id + 1 === arr.length && (id + 1) % 2 === 0 && (
                  <div>
                    <span className="education-rounder  hidden xl:inline-block bg-sky-400"></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Gap height={10} />
    </>
  );
};

export default Experience;
