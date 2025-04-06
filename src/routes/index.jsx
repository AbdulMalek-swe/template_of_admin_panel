import { DashboardLayout } from "../layouts/dashboard.layout";
import CategoryShow from "../pages/category";
import Dashboard from "../pages/Dashboard/Dashboard";
// import { getToken } from "../utils/helpers";

 
const appRoutes = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
     children:[
      { index:true, element:  <Dashboard></Dashboard> },
      { path:"category", element:  <CategoryShow/> },
       
     ]
  },
];

/* Generate permitted routes */
export const permittedRoutes = () => {
  // const token = getToken();

  // if (token) {
    return appRoutes;
  // }

  // return [];
};