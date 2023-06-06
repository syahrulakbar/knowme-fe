import { useState, useEffect } from "react";
import { TiWeatherSunny, HiMoon, RiLogoutCircleRLine } from "../../utils/icon-library";
import PropTypes from "prop-types";
import { logout } from "../../config/Redux/Action";
import { useNavigate } from "react-router-dom";
import { ProfileModal } from "./Modal";
import { ProfileBar, Footer, Navbar } from "./index";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state) => state.globalReducer);
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
  const handleShowModal = (event) => {
    event.preventDefault();
    dispatch({ type: "TOGGLE_MODAL", payload: true });
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
      <section id="container-all" className={` dark:text-white text-black container mx-auto flex relative justify-center min-h-screen w-full`}>
        {showModal && (
          <div className={`fixed flex justify-center items-center w-full h-screen top-0 right-0 bg-black bg-opacity-25 backdrop-filter backdrop-blur-sm z-50`}>
            <ProfileModal />
          </div>
        )}
        <div id="container-content" className=" justify-center flex w-full lg:w-[80%]">
          <div id="container-content-1" className="w-full m-5">
            <div className="w-full flex justify-end items-center gap-5 pb-5">
              <div className="flex items-center gap-2">
                <button aria-label="button view mode" onClick={toggleDarkMode}>
                  {localStorage.theme === "light" ? <TiWeatherSunny className="w-8 h-8" /> : <HiMoon className="w-8 h-8" />}
                </button>
                <button onClick={handleShowModal} aria-label="button edit profile" className="font-medium bg-gray-200 text-primary-black dark:bg-white dark:text-black p-2 rounded-lg">
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
