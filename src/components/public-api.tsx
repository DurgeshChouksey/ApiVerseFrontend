import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import TopCategories from "./top-categories";
import BasicPagination from "./pagination";
import Loading from "@/pages/Loading";
import { HoverEffect } from "./ui/card-hover-effect";
import { useGetPublicApisQuery } from "@/features/apis/apisApi";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const PublicApi = () => {
  const [sort, setSort] = useState("views");
  const [currentPage, setCurrentPage] = useState(1);
  const filter = useSelector((state: RootState) => state.search.filter);

  const { data, isLoading, error, refetch } = useGetPublicApisQuery(
    { page: currentPage, sort, filter: filter || "" },
    { refetchOnMountOrArgChange: true }
  );

  // Derived data for rendering
  const publicApi = data?.apis || [];
  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  // Reset page when sort changes (safe inside useEffect)
  useEffect(() => {
    setCurrentPage(1);
  }, [sort]);

  // Optional: log query result safely
  useEffect(() => {
    console.log("Public API data:", data);
    console.log("Loading:", isLoading, "Error:", error);
  }, [data, isLoading, error]);

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading APIs</p>;

  const handleSortChange = (e: any) => {
    setSort(e.target.value); // ✅ safe in event handler
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // ✅ safe in event handler
  };

  return (
    <div className="md:mt-10">
      <Sidebar />
      <div className="md:ml-[200px] p-6">
        <TopCategories publicApi={publicApi} />
        <h1 className="mt-5 text-3xl font-poppins">PUBLIC API'S</h1>

        {/* Sorting dropdown */}
        <div className="mt-7">
          <label htmlFor="sort" className="mr-2 font-semibold">
            Sort by:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={handleSortChange}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="views">Views</option>
            <option value="rating">Rating</option>
            <option value="createdAt">Created At</option>
          </select>
        </div>

        <HoverEffect apis={publicApi} />

        {/* Pagination */}
        <BasicPagination
          totalPages={totalPages}
          currentPage={currentPage}
          siblingsCount={2}
          onPageChange={handlePageChange}
          showDemo={false}
        />
      </div>
    </div>
  );
};

export default PublicApi;
