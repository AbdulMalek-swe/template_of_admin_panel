import { Outlet } from "react-router-dom"; 
import Sidebar from "../components/menu-bar/sidebar";
import Header from "../components/menu-bar/header";

export const DashboardLayout = () => { 
  return (
    // <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div  > 
      <div className="flex h-screen overflow-hidden">
        {/* sidbar start  */}
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* Header start  */}
          <Header   />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};