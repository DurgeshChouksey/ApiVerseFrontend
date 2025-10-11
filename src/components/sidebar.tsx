import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const { pathname } = useLocation();

  const linkClasses = (path) => `block px-4 py-2 rounded-lg transition ${
      pathname === path ? "bg-primary text-white" : "text-gray-700 dark:hover:bg-gray-100 dark:hover:text-black hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <aside className="hidden h-screen w-[200px] border-r-2 border-gray-300 dark:border-gray-800 text-white fixed top-16 left-0 md:flex flex-col px-3 shadow-lg">
      <nav className="flex flex-col mt-10 space-y-2">
        <Link to="/public" className={linkClasses("/public")}>Discover</Link>
        <Link to="/workspace" className={linkClasses("/workspace")}>Workspace</Link>
      </nav>
    </aside>
  );

};

export default Sidebar;
