import { useState, useEffect } from "react";
import BasicPagination from "./pagination";
import { HoverEffect } from "./ui/card-hover-effect";
import Loading from "@/pages/Loading";
import { useGetMyApisQuery } from "@/features/apis/apisApi";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const MyApi = () => {
  const [sort, setSort] = useState("views");
  const [currentPage, setCurrentPage] = useState(1);
  const filter = useSelector((state: RootState) => state.search.filter);

  // RTK Query hook to fetch user's APIs
  const { data, isLoading, error, refetch } = useGetMyApisQuery(
    { page: currentPage, sort, filter: filter || "" }, // pass filter if needed
    { refetchOnMountOrArgChange: true }      // force fetch on mount
  );

  // Derived data
  const apis = data?.apis || [];
  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  // Reset page when sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [sort]);

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading APIs</p>;

  // Event handlers
  const handleSortChange = (e: any) => {
    setSort(e.target.value); // RTK Query automatically refetches
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // triggers query with new page
  };

  return (
    <div className="md:ml-[18%] p-6">
      <h1 className="mt-5 text-3xl font-poppins">My APIs</h1>
      <p className="mt-2 dark:text-gray-300 text-gray-700">
        This section shows APIs created by you or your organization.
      </p>

      {/* Sorting */}
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

      {/* API Cards */}
      <HoverEffect apis={apis} />

      {/* Pagination */}
      <BasicPagination
        totalPages={totalPages}
        currentPage={currentPage}
        siblingsCount={2}
        onPageChange={handlePageChange}
        showDemo={false}
      />
    </div>
  );
};

export default MyApi;
