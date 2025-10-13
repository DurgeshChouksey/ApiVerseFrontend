import { useState, useEffect } from "react";
import AddProjectForm from "@/components/add-project-form";
import Card from "@/components/card";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { redableDate } from "@/lib/redableDates";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { myApis } from "@/features/apis/apiSlice";

interface ProjectFormData {
  projectName: string;
  description: string;
  category: string;
  team: string;
}

interface ApiData {
  id: string;
  name: string;
  description: string;
  category: string;
  owner: {
    username: string;
  };
  updatedAt: string;
  apiLogs: Array<{
    totalCalls: number;
    totalErrors: number;
    averageLatency: number;
  }>;
  isBookmarked: boolean;
}

const Studio = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [apis, setApis] = useState<ApiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const dispatch = useDispatch<AppDispatch>();

  async function fetchMyApis() {
    setLoading(true);
    const { payload } = await dispatch(
      myApis({ page: "", sort: "", filter: "" })
    );
    setApis(payload.apis);
    setLoading(false);
  }

  const handleAddProject = async (newProject: ProjectFormData) => {
    try {
      // Create API project
      await fetchWithAuth("/api/v1/apis", {
        method: "POST",
        data: {
          name: newProject.projectName,
          description: newProject.description,
          category: newProject.category,
          baseUrl: "https://example.google.com",
        },
      });

      // Fetch updated APIs list
      await fetchMyApis();

      // Close the form on success
      closeForm();
    } catch (err: any) {
      console.error("Error creating API project:", err);
      setError("Failed to create API project");
    }
  };

  useEffect(() => {
    fetchMyApis();
  }, []);

  return (
    <div className="bg-background h-screen text-foreground overflow-hidden">
      <div className="px-4 sm:px-8 py-6 sm:py-10 mt-10 h-full overflow-y-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          API'Verse Studio
        </h1>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
          <div className="flex-1 sm:flex-none sm:flex sm:gap-2">
            <input
              type="text"
              placeholder="Search API Projects"
              className="w-full rounded-md border border-input bg-background px-3 sm:px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm sm:text-base"
            />
          </div>
          <button
            onClick={openForm}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md font-medium transition-colors text-sm sm:text-base whitespace-nowrap"
          >
            + Add API Project
          </button>
        </div>

        <div className="mt-8 sm:mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            <div className="col-span-full text-center px-4 sm:px-0">
              <p className="text-base sm:text-lg font-semibold text-foreground">
                Loading your API Projects...
              </p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center px-4 sm:px-0">
              <p className="text-base sm:text-lg font-semibold text-destructive">
                {error}
              </p>
              <button
                onClick={fetchUserApis}
                className="mt-4 sm:mt-6 px-4 py-2 border border-border bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors text-sm sm:text-base"
              >
                Retry
              </button>
            </div>
          ) : apis.length === 0 ? (
            <div className="col-span-full text-center px-4 sm:px-0">
              <p className="text-base sm:text-lg font-semibold text-foreground">
                You don't have any API Projects
              </p>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base max-w-md mx-auto">
                Add a new API Project from scratch or use our "Demo Project" to
                explore API Projects features
              </p>
              <button
                onClick={openForm}
                className="mt-4 sm:mt-6 px-4 py-2 border border-border bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors text-sm sm:text-base"
              >
                + Add API Project
              </button>
            </div>
          ) : (
            apis.map((api) => (
              <Card
                key={api.id}
                apiId={api.id}
                name={api.name}
                description={api.description}
                category={api.category}
                ownerName={api.owner.username}
                lastUpdate={redableDate(api.updatedAt)}
                totalCalls={api.apiLogs[0]?.totalCalls || 0}
                totalErrors={api.apiLogs[0]?.totalErrors || 0}
                averageLatency={api.apiLogs[0]?.averageLatency || 0}
                isBookmarked={api.isBookmarked}
              />
            ))
          )}
        </div>
      </div>

      {/* Add Project Form */}
      <AddProjectForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onAddProject={handleAddProject}
      />
    </div>
  );
};

export default Studio;
