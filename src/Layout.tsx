import { Outlet, Link } from "react-router-dom";
import NavButtons from "./components/NavButtons";

const Layout = () => {
  return (
    <div>
      <NavButtons />
      <Outlet />
    </div>
  );
};

export default Layout;
