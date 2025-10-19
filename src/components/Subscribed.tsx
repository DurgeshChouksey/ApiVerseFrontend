import { useState } from "react";
import BasicPagination from "./pagination";
import { HoverEffect } from "./ui/card-hover-effect";
import Loading from "@/pages/Loading";
import { useGetSubscribedApisQuery } from "@/features/apis/apisApi";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const SubscribedApi = () => {
  const [sort, setSort] = useState("views");
  const [currentPage, setCurrentPage] = useState(1);
  const filter = useSelector((state: RootState) => state.search.filter);

  // RTK Query hook to fetch subscribed APIs
  const { data, isLoading, error } = useGetSubscribedApisQuery(
    { page: currentPage, sort, filter: filter || "" },
    { refetchOnMountOrArgChange: false }
  );

  const apis = data?.apis || [];
  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  const handleSortChange = (e: any) => {
    setSort(e.target.value);
    setCurrentPage(1); // reset page when sort changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading subscribed APIs</p>;

  return (
    <div className="md:ml-[18%] p-6">
      <h1 className="mt-5 text-3xl font-poppins">My Subscriptions</h1>
      <p className="mt-2 dark:text-gray-300 text-gray-700">
        This section shows APIs you or your organization have subscribed to.
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

      {/* Cards */}
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

export default SubscribedApi;
