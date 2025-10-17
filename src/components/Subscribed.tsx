
import { subscribedApis } from "@/features/apis/apisSlice";
import Loading from "@/pages/Loading";
import type { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicPagination from "./pagination";
import { HoverEffect } from "./ui/card-hover-effect";

const SubscribedApi = () => {
  const [apis, setApis] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("views");

  const filter = useSelector((state: RootState) => state.apis.filter);
  const dispatch = useDispatch<AppDispatch>();

  async function fetchSubscribedApis(page = 1) {
    setLoading(true);
    const { payload } = await dispatch(subscribedApis({ page, sort, filter }));
    setApis(payload.apis || []);
    setTotalPages(Math.ceil(payload.total / payload.limit));
    setCurrentPage(payload.page);
    setLoading(false);
  }

  useEffect(() => {
    fetchSubscribedApis();
  }, [filter, sort]);

  if (loading) {
    return <Loading />;
  }

  const handleSortChange = (e: any) => {
    setSort(e.target.value);
    fetchSubscribedApis(1);
  };

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

      <BasicPagination
        totalPages={totalPages}
        currentPage={currentPage}
        siblingsCount={2}
        onPageChange={(page) => fetchSubscribedApis(page)}
        showDemo={false}
      />
    </div>
  );
};

export default SubscribedApi;
