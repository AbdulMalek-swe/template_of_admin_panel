import React, { useState, useRef, useEffect } from "react";
import ThemeColor from "./mode";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiFullscreenFill } from "react-icons/ri";
import { FiGrid, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import userimg from "../../assets/logo/userimg.jpg";
import { CiSettings } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { RiMenuUnfold3Fill } from "react-icons/ri";
import { FaFlag } from "react-icons/fa";

const Header = ({ toggleSidebar, menuOpen, setMenuStyle, menuStyle }) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  // const [header, setHeader] = useState("fixed");
  // const [menuStyle, setMenuStyle] = useState("click");

  // const [layoutStyle, setLayoutStyle] = useState("fullWidth");

  // console.log("header",header)

  const [isOpen, setIsOpen] = useState(false);
  const [check, setCheck] = useState("");
  const [flagUrl, setFlagUrl] = useState("");

  const [theme, setTheme] = useState(() => {
    return (
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // const toggleTheme = () => {
  //   setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  // };
  const toggleTheme = (selectedTheme) => {
    if (theme !== selectedTheme) {
      setTheme(selectedTheme);
      setCheck(selectedTheme);
    }
  };
  // ✅ Click Outside to Close
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // USE FLAG
  useEffect(() => {
    fetch("https://ipinfo.io?token=d12e9ebf8437bb")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const countryCode = data.country.toLowerCase();
        const flagUrl = `https://flagcdn.com/w320/${countryCode}.png`; // Removed the extra space
        setFlagUrl(flagUrl);
      })
      .catch((error) => console.error("Error fetching country data:", error));
  }, []);

  return (
    <div
      className={`bg-lightCard dark:bg-darkCard  py-4 px-2 shadow-md dark:shadow-md w-full relative  `}
    >
      {menuStyle == "click" && !menuOpen && (
        <RiMenuUnfold3Fill
          onClick={() => toggleSidebar()}
          className="absolute left-5 top-6 text-2xl z-10 cursor-pointer text-lightTitle dark:text-darkTitle"
        />
      )}
      <div className="flex justify-end gap-5 items-center relative">
        <div className="text-4xl  rounded-full cursor-pointer hidden md:block">
          {flagUrl && (
            <img src={flagUrl} alt="Country Flag" className=" w-8 h-6 " />
          )}
        </div>
        <div>
          <div className="hidden md:block">
            <ThemeColor toggleTheme={toggleTheme} theme={theme} />
          </div>
        </div>
        <IoNotificationsOutline className="text-4xl bg-gray-200 p-2 rounded-full cursor-pointer hidden md:block" />
        <RiFullscreenFill className="text-4xl bg-gray-200 p-2 rounded-full cursor-pointer hidden md:block" />
        <FiGrid className="text-4xl bg-gray-200 p-2 rounded-full cursor-pointer hidden md:block" />

        {/* User Profile Section */}
        <div className="relative" ref={popupRef}>
          <div
            className="flex gap-3 items-center border-r-2 pr-5 border-lightBorder cursor-pointer"
            onClick={() => setShowPopup(!showPopup)}
          >
            <img src={userimg} alt="User" className="w-9 h-9 rounded-full" />
            <div className="flex items-center flex-col dark:text-darkTitle">
              <span className="font-bold text-[14px] text-left block">
                Jone
              </span>
              <span className="text-[12px]">Admin</span>
            </div>
          </div>

          {/* Popup Dropdown with Animation */}
          {showPopup && (
            <div
              className={`absolute right-0 mt-2 w-48 bg-light shadow-lg rounded-lg py-2 dark:bg-darkCard dark:text-darkTitle 
              transition-all duration-300 z-50 ${
                showPopup ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <ul>
                <li className="flex items-center gap-3 px-4 py-2  cursor-pointer">
                  <FiUser className="text-lg" />
                  <span>Profile</span>
                </li>
                <li className="flex items-center gap-3 px-4 py-2  cursor-pointer">
                  <FiSettings className="text-lg" />
                  <span>Settings</span>
                </li>
                <li className="flex items-center gap-3 px-4 py-2 cursor-pointer text-red-500">
                  <FiLogOut className="text-lg" />
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        <CiSettings
          onClick={() => setIsOpen(true)}
          className="text-3xl rounded-full animate-[spin_2s_linear_infinite] dark:text-darkTitle cursor-pointer"
        />

        <div
          className={`fixed top-0 right-0 md:w-[600px] h-full w-full  bg-light dark:bg-dark p-5 shadow-lg dark:text-darkTitle transform transition-transform duration-700 z-50 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-2xl cursor-pointer"
          >
            &times;
          </button>

          {/* Title */}
          <h2 className="text-2xl font-semibold mb-4 text-left ">Setting</h2>

          <hr className="text-lightBorder" />

          {/* Theme Color Mode */}

          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-left pt-2">
              Theme color mode:
            </h3>
            <div className="flex gap-3">
              <button
                onClick={() => toggleTheme("light")}
                className={`w-full rounded-full p-2 md:p-3 flex items-center space-x-2 ${
                  theme == "light" ? "bg-blue-500" : "bg-gray-200"
                }`}
              >
                <div
                  className={`${
                    theme ? "border-none" : "border"
                  } w-7 h-7 rounded-full flex items-center justify-center text-black z-30 ${
                    theme == "light" ? "bg-white" : "bg-white"
                  }`}
                >
                  {theme == "light" ? (
                    <FaCheck className="text-blue-600" />
                  ) : (
                    ""
                  )}
                </div>
                <span className="text-dark">Light</span>
              </button>

              <button
                onClick={() => toggleTheme("dark")}
                className={`w-full rounded-full p-2 md:p-3 flex items-center space-x-2 ${
                  theme == "dark" ? "bg-blue-500" : "bg-gray-200"
                }`}
              >
                <div
                  className={`${
                    check ? "border-none" : "border"
                  } w-7 h-7 rounded-full flex items-center justify-center text-black z-30 ${
                    theme == "dark" ? "bg-white" : "bg-white"
                  }`}
                >
                  {theme == "dark" ? <FaCheck className="text-blue-600" /> : ""}
                </div>
                <span>dark</span>
              </button>
            </div>
          </div>

          <hr className="text-lightCard dark:darkCard" />

          {/* Menu  Style */}
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 pt-2 text-left">
              Vertical & Horizontal menu style
            </h3>
            <div className="flex gap-3">
              <button
                onClick={() => setMenuStyle("click")}
                className={`w-full rounded-full p-2 md:p-3 flex items-center space-x-2 ${
                  menuStyle == "click" ? "bg-blue-500" : "bg-gray-200"
                }`}
              >
                <div
                  className={`${
                    menuStyle ? "border-none" : "border"
                  } w-7 h-7 rounded-full flex items-center justify-center text-black z-30 ${
                    menuStyle == "click" ? "bg-white" : "bg-white"
                  }`}
                >
                  {menuStyle == "click" ? (
                    <FaCheck className="text-blue-600" />
                  ) : (
                    ""
                  )}
                </div>
                <span className="text-dark">Menu click</span>
              </button>
              <button
                onClick={() => setMenuStyle("hover")}
                className={`w-full rounded-full p-2 md:p-3 flex items-center space-x-2 ${
                  menuStyle == "hover" ? "bg-blue-500" : "bg-gray-200"
                }`}
              >
                <div
                  className={`${
                    menuStyle ? "border-none" : "border"
                  } w-7 h-7 rounded-full flex items-center justify-center text-black z-30 ${
                    menuStyle == "hover" ? "bg-white" : "bg-white"
                  }`}
                >
                  {menuStyle == "hover" ? (
                    <FaCheck className="text-blue-600" />
                  ) : (
                    ""
                  )}
                </div>
                <span className="text-dark">Icon hover</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
