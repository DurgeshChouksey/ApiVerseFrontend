import { Link, useLocation, useParams } from "react-router-dom";
import Endpoints from "./endpoints";
import CategoriesNav from "./categories-nav";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { apiId } = useParams<{ apiId: string }>();



  const linkClasses = (path: string) =>
    `block px-4 py-2 rounded-lg transition ${
      pathname === path
        ? "bg-primary text-white"
        : "text-black dark:text-gray-200 dark:hover:bg-gray-100 dark:hover:text-black hover:bg-gray-800 hover:text-white"
    }`;


  return (
    <aside
      className={`hidden h-screen ${
        pathname === "/public" || pathname === "/workspace"
          ? "w-[200px]"
          : "w-[250px]"
      } border-r-2 border-gray-300 dark:border-gray-800 text-white fixed top-16 left-0 md:flex flex-col shadow-lg`}
    >
      <nav className="flex flex-col mt-5 px-3 space-y-2">
        <Link to="/public" className={linkClasses("/public")}>
          Discover
        </Link>
        <Link to="/workspace" className={linkClasses("/workspace")}>
          Workspace
        </Link>
      </nav>

      <CategoriesNav></CategoriesNav>

      <Endpoints pathname={pathname} apiId={apiId}></Endpoints>

    </aside>
  );
};

export default Sidebar;
