import { Outlet } from "react-router-dom";
import Sidebar from "../components/menu-bar/sidebar";
import Header from "../components/menu-bar/header";
import { useState } from "react";

export const DashboardLayout = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [menuStyle, setMenuStyle] = useState("click");

  console.log("menuStyle", menuStyle);

  const toggleSidebar = () => {
    console.log("first");
    setMenuOpen(!menuOpen);
  };

  return (
    // <div className="dark:bg-boxdark-2 dark:text-bodydark">
    <div>
      <div className="flex h-screen overflow-hidden">
        {/* sidbar start  */}
        <Sidebar
          toggleSidebar={toggleSidebar}
          menuOpen={menuOpen}
          menuStyle={menuStyle}
          setMenuStyle={setMenuStyle}
        />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden  ">
          {/* Header start  */}
          <Header
            toggleSidebar={toggleSidebar}
            menuOpen={menuOpen}
            menuStyle={menuStyle}
            setMenuStyle={setMenuStyle}

          />
          <main>
            <div
              className={`mx-auto w-full p-4 md:p-6 2xl:p-10 bg-light dark:bg-dark  `}
            >
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
