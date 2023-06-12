import { useSelector } from "react-redux";
import ProfilePicture from "../../assets/images/profilePicture.png";

const ProfileBar = () => {
  const { account } = useSelector((state) => state.globalReducer);
  const { user } = account;

  return (
    <div id="head-profile" className=" transition duration-150 ease-in-out flex flex-wrap xl:flex-nowrap w-full relative">
      <div id="profile-image" className="w-full flex justify-center xl:justify-end xl:w-[30%] mx-4">
        <div className="relative w-[200px] h-[200px]">
          <img
            loading="lazy"
            className=" object-cover object-top absolute inset-0 w-full h-full p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
            src={user?.picture ? `http://localhost:3000/assets/${user?.picture}` : ProfilePicture}
            alt="Bordered avatar"
          />
        </div>
      </div>
      <div id="profile-desc" className="w-full xl:w-[70%]">
        <div className="desc-profile flex flex-wrap justify-center xl:justify-start">
          <h1 className="xl:text-3xl text-2xl text-center xl:text-left font-medium w-full">{user?.name || "Random People"}</h1>
          <h2 id="status" className="font-light text-center  xl:text-left">
            {user?.role || `Student`}
          </h2>
          <div className={`w-full flex justify-center xl:justify-start pt-2 text-slate-900 dark:text-white `}>
            <div id="contact-logo" className="flex  mb-5">
              {user?.sosialMedia?.map((item, index) => {
                const key = Object.keys(item)[0];
                const value = item[key];
                const imgUrl = `https://simpleicons.org/icons/${key}.svg`;
                return (
                  <a
                    key={index}
                    href={value}
                    aria-label={`view my ${key}`}
                    target="_blank"
                    className="w-9 h-9 mr-3 rounded-full flex items-center justify-center border border-slate-300 bg-white  hover:border-sky-400 hover:bg-sky-400 hover:text-white"
                    rel="noopener noreferrer"
                  >
                    <img src={imgUrl} alt="icon sosial media" width={20} />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="w-full">
            <h2 className="font-medium text-lg text-left">About Me</h2>
            <p className="font-light">{user?.about || `Ordinary Random People`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;
