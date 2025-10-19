import { useEffect, useState } from "react";
import AddEndpointForm from "@/components/add-endpoint-form";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "@/redux/store";
import SearchBar from "@/components/search-bar";
import { getEndpoints } from "@/features/endpoints/endpointSlice";

type Endpoint = {
  id: string;
  name: string;
  description: string;
  method: string;
  path: string;
};

const Definition = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { apiId } = useParams<{ apiId: string }>();
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [editingEndpoint, setEditingEndpoint] = useState<Endpoint | null>(null);
  const filter = useSelector<RootState>((state) => state.endpoints.filter);

  useEffect(() => {
    async function fetchEndpoints() {
      if (!apiId) return;
      try {
        setLoading(true);
        setError(null);
        const { payload } = await dispatch(getEndpoints({ apiId, filter }));
        if (Array.isArray(payload)) setEndpoints(payload);
        else setEndpoints([]);
      } catch (e: any) {
        console.log(e);
        setError("Failed to load endpoints");
      } finally {
        setLoading(false);
      }
    }
    fetchEndpoints();
  }, [apiId, dispatch, filter]);

  const handleEditClick = (endpoint: Endpoint) => {
    setEditingEndpoint(endpoint);
    setShowAddForm(true);
  };

  const handleCreateClick = () => {
    setEditingEndpoint(null);
    setShowAddForm(true);
  };

  const getMethodColor = (method: string) => {
    switch ((method || "").toUpperCase()) {
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

  if (showAddForm) {
    return (
      <div className="flex flex-col h-[calc(100vh-140px)]">
        <AddEndpointForm
          initialData={editingEndpoint}
          onCancel={() => {
            setShowAddForm(false);
            setEditingEndpoint(null);
          }}
          onSubmit={(data) => {
            if (editingEndpoint) {
              console.log("Submit updated endpoint", {
                ...data,
                id: editingEndpoint.id,
              });
            } else {
              console.log("Submit new endpoint", data);
            }
            setShowAddForm(false);
            setEditingEndpoint(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="h-fit border border-border rounded-md shadow-sm p-4 md:p-6 flex flex-col">
      <h2 className="text-2xl font-semibold text-gray-300 mb-2">Endpoints</h2>
      <p className="text-base text-gray-500 mb-1">
        Changes made to the endpoints will be reflected in the Hub.
      </p>
      <p className="text-base text-gray-500">
        Add and define your API endpoints.
      </p>

      {/* Responsive layout for search bar and create button */}
      <div className="mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <SearchBar />
        <div className="flex justify-end sm:pr-7 md:justify-start">
          <button
            onClick={handleCreateClick}
            className="px-2 py-1 text-xs rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Create Endpoint
          </button>
        </div>
      </div>

      {/* Header row - hidden on small screens */}
      <div className="mt-4">
        <div className="hidden md:grid grid-cols-3 gap-x-0 md:gap-x-1 px-3 py-2 rounded-md bg-accent text-accent-foreground">
          <div className="text-sm font-semibold">Endpoints</div>
          <div className="text-sm font-semibold text-center">Methods</div>
          <div className="text-sm font-semibold text-right pr-3">Action</div>
        </div>
      </div>

      <div className="mt-2 flex-1 overflow-auto">
        {loading && <p className="text-gray-400 px-3">Loading endpoints...</p>}
        {error && <p className="text-red-500 px-3">{error}</p>}
        {!loading && !error && endpoints.length === 0 && (
          <p className="text-gray-400 px-3">No endpoints found.</p>
        )}
        {!loading && !error && endpoints.length > 0 && (
          <ul className="divide-y divide-border">
            {endpoints.map((ep: Endpoint) => (
              <li
                key={ep.id}
                className="flex flex-col md:grid md:grid-cols-3 gap-y-1 md:gap-x-1 px-3 py-3 hover:bg-accent/30 transition-colors"
              >
                {/* Endpoint Name */}
                <div className="text-sm text-foreground">
                  <span className="font-semibold md:hidden">Endpoint: </span>
                  {ep?.name || ep?.path || "Unnamed Endpoint"}
                </div>

                {/* Method */}
                <div className="text-sm flex items-center md:justify-center">
                  <span className="font-semibold md:hidden mr-1">Method:</span>
                  <span
                    className={`inline-flex items-center justify-center w-20 px-2 py-0.5 rounded border border-border ${getMethodColor(
                      ep?.method
                    )}`}
                  >
                    {(ep?.method || "").toUpperCase()}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex justify-start md:justify-end gap-2 mt-1 md:mt-0">
                  <button
                    onClick={() => handleEditClick(ep)}
                    className="px-2 py-1 text-xs rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => console.log("Delete")}
                    className="px-2 py-1 text-xs rounded-md border border-border bg-background transition-colors text-destructive"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Definition;
