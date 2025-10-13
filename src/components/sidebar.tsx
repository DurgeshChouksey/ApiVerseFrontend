import { getEndpoints } from "@/features/endpoints/endpointSlice";
import type { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { apiId } = useParams<{ apiId: string }>();

  const [endpoints, setEndpoints] = useState<any[]>([]);
  const filter = "";

  useEffect(() => {
    async function fetchEndpoints() {
      if (!apiId) return;
      const { payload } = await dispatch(getEndpoints({ apiId, filter }));
      if (
        payload &&
        Array.isArray(payload) &&
        payload.length > 0 &&
        pathname === `/playground/${apiId}`
      ) {
        const firstEndpointId = payload[0].id;
        navigate(`/playground/${apiId}/${firstEndpointId}/test`, {
          replace: true,
        });
      }
      if (payload && Array.isArray(payload)) {
        setEndpoints(payload);
      }
    }

    fetchEndpoints();
  }, [apiId, dispatch]);

  const linkClasses = (path: string) =>
    `block px-4 py-2 rounded-lg transition ${
      pathname === path
        ? "bg-primary text-white"
        : "text-black dark:text-gray-200 dark:hover:bg-gray-100 dark:hover:text-black hover:bg-gray-800 hover:text-white"
    }`;

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":
        return "text-blue-500";
      case "POST":
        return "text-green-500";
      case "PUT":
        return "text-yellow-500";
      case "DELETE":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

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

      {pathname !== "/public" && pathname !== "/workspace" && (
        <div className="text-black dark:text-white pt-5 mt-5 border-t-2 dark:border-gray-800">
          <h1 className="mx-2 pl-4 py-1 rounded-md">Endpoints</h1>
          <ul className="border-l-2 border-gray-500 flex flex-col mt-5 ml-6 pl-2 space-y-3">
            {endpoints.length > 0 &&
              endpoints.map((endpoint) => (
                <li key={endpoint.id}>
                  <Link
                    to={`/playground/${apiId}/${endpoint.id}/test`}
                    className="flex gap-2 items-center"
                  >
                    <span
                      className={`text-[.6rem] ${getMethodColor(
                        endpoint?.method
                      )}`}
                    >
                      {endpoint?.method}
                    </span>
                    <span className="text-[.9rem] text-black dark:text-gray-300">
                      {endpoint?.name}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
