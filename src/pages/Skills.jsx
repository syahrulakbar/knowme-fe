import { useDispatch, useSelector } from "react-redux";
import { Button, Gap } from "../components";
import { BiPencil, BsFillPatchCheckFill, RiDeleteBin5Line } from "../utils/icon-library";
import { deleteSkills } from "../config/Redux/Action";
import { initSwalError } from "../utils/alert-initiator";

const Skills = () => {
  const { account, token, isUpdate } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  const { skills } = account;

  const handleShowModal = (event, id) => {
    event.preventDefault();
    if (skills?.length >= 5 && !id) return initSwalError("Sorry cannot add skills again :(");
    dispatch({ type: "TOGGLE_MODAL", payload: { isShow: true, modal: "skill" } });
    dispatch({ type: "UPDATE_SKILL", payload: id || "" });
  };
  const handleDeleteSkills = (event, id) => {
    event.preventDefault();
    try {
      dispatch(deleteSkills(token, id, isUpdate));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="text-black dark:text-white">
      <Gap height={10} />
      <div className="w-full flex justify-end">
        <Button label="Add Skill" onClick={handleShowModal} type="button" className="font-medium bg-gray-200 text-primary-black dark:bg-white dark:text-black p-2 rounded-lg" />
      </div>
      <Gap height={10} />
      <div className="w-full flex flex-wrap justify-center overflow-y-hidden">
        {skills?.map((skill) => (
          <div key={skill.id} className="w-full m-0 xl:m-5 xl:w-[40%] flex flex-wrap justify-center items-center  text-center">
            <div className="w-full flex flex-row justify-center gap-2">
              <h2 className="text-2xl">{skill.categorySkills}</h2>
              <div className="flex flex-row gap-2">
                <Button onClick={(event) => handleShowModal(event, skill.id)} className="dark:text-white">
                  <BiPencil size={25} />
                </Button>
                <Button type="button" onClick={(event) => handleDeleteSkills(event, skill.id)} className="text-red-500">
                  <RiDeleteBin5Line size={25} />
                </Button>
              </div>
            </div>
            {skill.detailSkills?.map((detail, id) => {
              const levelSkill = Object.keys(detail)[0];
              const nameSkill = Object.values(detail)[0];
              return (
                <div key={id} className="w-[50%] flex flex-wrap justify-center text-left p-5">
                  <i className="max-[370px]:hidden p-2 text-sky-500">
                    <BsFillPatchCheckFill></BsFillPatchCheckFill>
                  </i>
                  <div>
                    <h3 className="text-md xl:text-lg">{nameSkill}</h3>
                    <p className="font-light text-sm">{levelSkill}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
