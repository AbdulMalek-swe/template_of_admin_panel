import { permittedRoutes } from "./routes";
import { Navigate, useRoutes } from "react-router-dom";
import "./App.css";  
import { DashboardLayout } from "./layouts/dashboard.layout";
import { ToastContainer } from "react-toastify";

function App() {
  const mainRoutes = {
    path: "/",
    element:  <div>home is back</div>,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      // { path: "/", element: <Login /> },
      // { path: "/otp", element: <OTP /> },
      // { path: "/login", element: <Login /> },
      // { path: "/registration", element: <Register /> },
    ],
  };

  const routing = useRoutes([mainRoutes, ...permittedRoutes()]);

  return (
    <div className=" ">
      {routing} 
      <ToastContainer />
    </div>
  );
}

export default App;
