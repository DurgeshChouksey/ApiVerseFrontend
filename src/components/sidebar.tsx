import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const { pathname } = useLocation();

  const linkClasses = (path) =>
    `block px-4 py-2 rounded-lg transition ${
      pathname === path ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
    }`;
  return (
    <aside className="hidden md:block h-screen w-[18%] border-2 border-black dark:border-white text-white fixed top-16 left-0 flex flex-col p-6 shadow-lg">
      <nav className="flex flex-col mt-10 space-y-2">
        <Link to="/public" className={linkClasses("/public")}>Public API</Link>
        <Link to="/myapi" className={linkClasses("/myapi")}>My API</Link>
        <Link to="/subscribed" className={linkClasses("/subscribed")}>Subscribed</Link>
      </nav>
    </aside>
  );

};

export default Sidebar;
