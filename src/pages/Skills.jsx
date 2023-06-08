import { Button, Gap } from "../components";
import { BiPencil, BsFillPatchCheckFill, RiDeleteBin5Line } from "../utils/icon-library";

const Skills = () => {
  const skillData = {
    frontend: [
      {
        skillName: "HTML5",
        skillLevel: "Intermediate",
      },
      {
        skillName: "CSS3",
        skillLevel: "Intermediate",
      },
      {
        skillName: "JavaScript",
        skillLevel: "Intermediate",
      },
      {
        skillName: "React JS",
        skillLevel: "Intermediate",
      },
      {
        skillName: "Vite",
        skillLevel: "Basic",
      },
      {
        skillName: "Webpack",
        skillLevel: "Basic",
      },
    ],
    backend: ["NodeJS", "Java"],
    framework: ["Bootstrap", "Tailwind", "Chakra UI"],
    deployment: ["Netlify", "Vercel", "GH Pages", "Firebase Hosting"],
    vcs: ["GIT", "Github"],
  };

  return (
    <section className="text-black dark:text-white">
      <Gap height={10} />
      <div className="w-full flex justify-end">
        <Button label="Add Skill" className="font-medium bg-gray-200 text-primary-black dark:bg-white dark:text-black p-2 rounded-lg" />
      </div>
      <div className=" w-full flex flex-wrap justify-center mt-10">
        <div className="w-full m-0 xl:m-5 xl:w-[40%] flex flex-wrap justify-center  text-center">
          <div className="w-full flex flex-row justify-center gap-2">
            <h2 className="text-2xl">Frontend Development</h2>
            <div className="flex flex-row gap-2">
              <Button className=" dark:text-white">
                <BiPencil size={25} />
              </Button>
              <Button className="text-red-500">
                <RiDeleteBin5Line size={25} />
              </Button>
            </div>
          </div>
          {skillData?.frontend?.map((skill, id) => (
            <div key={id} className="w-[50%] flex flex-wrap justify-center text-left p-5">
              <i className="max-[370px]:hidden p-2 text-sky-500">
                <BsFillPatchCheckFill></BsFillPatchCheckFill>
              </i>
              <div>
                <h3 className="text-md xl:text-lg">{skill.skillName}</h3>
                <p className="font-light text-sm">{skill.skillLevel}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full m-0 xl:m-5 h-min xl:w-[40%] flex flex-wrap justify-center  text-center">
          <h2 className="w-full text-2xl">Backend Development</h2>
          {skillData?.backend?.map((skill, id) => (
            <div key={id} className="w-[50%] flex flex-wrap  justify-center  text-left p-5">
              <i className="max-[370px]:hidden  p-2 text-sky-500">
                <BsFillPatchCheckFill></BsFillPatchCheckFill>
              </i>
              <div>
                <h3 className="text-md xl:text-lg">{skill}</h3>
                <p className="font-light text-sm">Basic</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full m-0 xl:m-5 h-min xl:w-[40%] flex flex-wrap justify-center  text-center">
          <h2 className="w-full text-2xl">Framework</h2>
          {skillData?.framework?.map((skill, id) => (
            <div key={id} className="w-[50%] flex flex-wrap  justify-center  text-left p-5">
              <i className="max-[370px]:hidden p-2 text-sky-500">
                <BsFillPatchCheckFill></BsFillPatchCheckFill>
              </i>
              <div>
                <h3 className="text-md xl:text-lg">{skill}</h3>
                <p className="font-light text-sm">Intermediate</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full m-0 xl:m-5 h-min xl:w-[40%] flex flex-wrap justify-center text-center">
          <h2 className="w-full text-2xl">Version Control System</h2>
          {skillData?.vcs?.map((skill, id) => (
            <div key={id} className="w-[50%] flex flex-wrap  justify-center  text-left p-5">
              <i className="max-[370px]:hidden  p-2 text-sky-500">
                <BsFillPatchCheckFill></BsFillPatchCheckFill>
              </i>
              <div>
                <h3 className="text-md xl:text-lg">{skill}</h3>
                <p className="font-light text-sm">Intermediate</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
