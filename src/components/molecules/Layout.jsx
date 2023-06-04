import { useState, lazy, useEffect } from "react";
import { TiWeatherSunny } from "react-icons/ti";
import { HiMoon } from "react-icons/hi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { logout } from "../../config/Redux/Action";
import { useNavigate } from "react-router-dom";
const ProfileBar = lazy(() => import("./ProfileBar"));
const Footer = lazy(() => import("./Footer"));
const Navbar = lazy(() => import("./Navbar"));

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches));
  const navigate = useNavigate();
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.theme = newMode ? "dark" : "light";
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <section id="container-all" className={` dark:text-white text-black container mx-auto flex   justify-center min-h-screen w-full`}>
        <div id="container-content" className=" justify-center flex w-full lg:w-[80%]">
          <div id="container-content-1" className="w-full m-5">
            <div className="w-full flex justify-end items-center gap-5">
              <div className="flex items-center gap-2">
                <button aria-label="button view mode" onClick={toggleDarkMode}>
                  {localStorage.theme === "light" ? <TiWeatherSunny className="w-8 h-8" /> : <HiMoon className="w-8 h-8" />}
                </button>
                <button aria-label="button edit profile" className="font-medium bg-primary-black text-white dark:bg-white dark:text-black p-2 rounded-lg">
                  Edit Profile
                </button>
              </div>
              <button onClick={handleLogout} aria-label="button logout" className="flex justify-center  bg-red-500 text-white p-2 rounded-lg">
                <RiLogoutCircleRLine size={25} />
              </button>
            </div>
            <ProfileBar />
            <section id="main-profile">
              <Navbar />
              <main>{children}</main>
            </section>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
