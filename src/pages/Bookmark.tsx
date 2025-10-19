import Loading from "./Loading";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useGetBookmarkedApisQuery } from "@/features/apis/apisApi";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Bookmark = () => {

  const filter = useSelector((state: RootState) => state.search.filter);

  // RTK Query hook to fetch bookmarked APIs
  const { data, isLoading, error } = useGetBookmarkedApisQuery({filter: filter || ""}, {
    refetchOnMountOrArgChange: false, // ensures fetch on mount
  });

  const bookmarkedApi = data?.bookmarks || [];

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading bookmarked APIs</p>;

  return (
    <div>
      <div className="mt-16">
        <div className="p-6">
          <h1 className="mt-5 text-3xl font-poppins uppercase">Bookmarked</h1>
          <p className="mt-2 dark:text-gray-300 text-gray-700">
            This section shows you information regarding APIs that you, your
            teams or your organizations have bookmarked.
          </p>

          <HoverEffect apis={bookmarkedApi.map((b: any) => b.api)} />
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
