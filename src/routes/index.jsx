import { DashboardLayout } from "../layouts/dashboard.layout";
import CategoryShow from "../pages/category";
// import { getToken } from "../utils/helpers";

 
const appRoutes = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
     children:[
      { path: "category", element:  <CategoryShow/> },
       
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