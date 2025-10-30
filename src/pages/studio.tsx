import { useState, useEffect } from "react";
import AddProjectForm from "@/components/add-project-form";
import SearchBar from "@/components/search-bar";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import BasicPagination from "@/components/pagination";
import { useGetMyApisQuery } from "@/features/apis/apisApi";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

interface ProjectFormData {
  projectName: string;
  description: string;
  category: string;
  team: string;
}

const Studio = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("");
  const [error, setError] = useState<string | null>(null);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const filter = useSelector((state: RootState) => state.search.filter);

  // RTK Query hook
  const { data, isLoading, error: queryError, refetch } = useGetMyApisQuery(
    { page: currentPage, sort, filter: filter || "" }, // replace filter if needed
    { refetchOnMountOrArgChange: true }
  );

  const apis = data?.apis || [];
  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  // Optional: log or handle query error
  useEffect(() => {
    if (queryError) setError("Failed to load your APIs");
  }, [queryError]);

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

      // Refetch updated API list
      refetch();

      closeForm();
    } catch (err: any) {
      console.error("Error creating API project:", err);
      setError("Failed to create API project");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // const handleSortChange = (e: any) => {
  //   setSort(e.target.value);
  //   setCurrentPage(1);
  // };

  return (
    <div className="bg-background h-screen text-foreground overflow-hidden">
      <div className="px-4 sm:px-8 py-6 sm:py-10 mt-10 h-full overflow-y-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          API'Verse Studio
        </h1>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
          <div className="flex-1 sm:flex-none sm:flex sm:gap-2">
            <SearchBar />
          </div>
          <button
            onClick={openForm}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md font-medium transition-colors text-sm sm:text-base whitespace-nowrap"
          >
            + Add API Project
          </button>
        </div>

        <div className="mt-8 sm:mt-12">
          {isLoading ? (
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
                onClick={refetch}
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
            <HoverEffect apis={apis} />
          )}
        </div>

        <BasicPagination
          totalPages={totalPages}
          currentPage={currentPage}
          siblingsCount={2}
          onPageChange={handlePageChange}
          showDemo={false}
        />
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
