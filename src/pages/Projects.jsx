import { useDispatch, useSelector } from "react-redux";
import { Button, Gap } from "../components";
import { RiDeleteBin5Line, BiPencil } from "../utils/icon-library";
import { deleteProject } from "../config/Redux/Action";

const Projects = () => {
  const dispatch = useDispatch();
  const { account, token, isUpdate } = useSelector((state) => state.globalReducer);
  const { projects } = account;

  const handleShowModal = (event, id) => {
    event.preventDefault();
    dispatch({ type: "TOGGLE_MODAL", payload: { isShow: true, modal: "project" } });
    dispatch({ type: "UPDATE_PROJECT", payload: id || "" });
  };
  const handleDeleteProject = (event, id) => {
    event.preventDefault();
    try {
      dispatch(deleteProject(token, id, isUpdate));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Gap height={10} />
      <div className="w-full flex justify-end">
        <Button onClick={handleShowModal} label="Add Project" className="font-medium bg-gray-200 text-primary-black dark:bg-white dark:text-black p-2 rounded-lg" />
      </div>
      <div id="project" className="container  mt-10 ">
        <div id="project-content" className="grid grid-cols-1 lg:grid-cols-2 justify-center w-full">
          {projects?.map((project) => (
            <a aria-label="link to my project" key={project.id} href={project.urlProject} target="_blank" rel="noopener noreferrer">
              <div className={`bg-white text-black dark:bg-slate-900 dark:text-white card relative mt-2 lg:m-3 rounded-lg shadow-md shadow-sky-400 h-[350px]`}>
                <div className="w-full h-[60%]">
                  <img loading="lazy" className="w-full h-full rounded-t-lg object-cover object-top" src={`http://localhost:3000/assets/${project.pictureProject}`} alt={`${project.projectName} preview`} />
                </div>
                <div id="project-title" className="w-full ">
                  <div className="p-5">
                    <div className="flex flex-row justify-between">
                      <h2 className="font-semibold  text-md lg:text-lg mt-1 hover:text-sky-400 ease-in-out transition-all duration-75">{project.projectName}</h2>
                      <div className="flex flex-row gap-2">
                        <Button onClick={(event) => handleShowModal(event, project.id)} className=" dark:text-white">
                          <BiPencil size={25} />
                        </Button>
                        <Button onClick={(event) => handleDeleteProject(event, project.id)} className="text-red-500">
                          <RiDeleteBin5Line size={25} />
                        </Button>
                      </div>
                    </div>
                    <p className="font-normal">{project.descriptionProject}</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
