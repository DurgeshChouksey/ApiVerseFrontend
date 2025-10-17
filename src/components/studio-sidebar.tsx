import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

const StudioSidebar = () => {
  const { pathname } = useLocation();
  const { apiId } = useParams();
  const navigate = useNavigate();

  const links = [
    { name: "Hub Listing", path: `/studio/${apiId}/publish` },
    { name: "Analytics", path: `/studio/${apiId}/analytics` },
    { name: "Settings", path: `/studio/${apiId}/settings` },
  ];

  const linkClasses = (path: string) =>
    `block px-4 py-2 rounded-lg transition ${
      pathname.startsWith(path)
        ? "bg-primary text-white"
        : "text-black dark:text-gray-200 dark:hover:bg-gray-100 dark:hover:text-black hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden h-screen w-[200px] border-r-2 border-gray-300 dark:border-gray-800 text-white fixed top-16 left-0 md:flex flex-col shadow-lg`}
      >
        <nav className="flex flex-col mt-5 px-3 space-y-2">
          {links.map((link) => (
            <Link key={link.path} to={link.path} className={linkClasses(link.path)}>
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Dropdown */}
      <div className="block md:hidden mt-18 w-fit px-6">
        <select
          value={
            links.find((link) => pathname.startsWith(link.path))?.path || ""
          }
          onChange={(e) => {
            const selectedPath = e.target.value;
            if (selectedPath) navigate(selectedPath);
          }}
          className="outline-none rounded-md dark:border-gray-700 bg-gray-300 dark:bg-gray-700 text-black dark:text-white py-2 px-3 w-full"
        >
          <option value="" disabled>
            Select Section
          </option>
          {links.map((link) => (
            <option key={link.path} value={link.path}>
              {link.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default StudioSidebar;
