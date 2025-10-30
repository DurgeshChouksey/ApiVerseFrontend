import { useParams } from "react-router-dom";
import { useGetPublicApisQuery } from "@/features/apis/apisApi";
import Loading from "@/pages/Loading";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const Category = () => {
  const { categoryName } = useParams<{ categoryName: string }>();

  // ✅ Just fetch all APIs normally
  const {
    data,
    isLoading,
    error,
  } = useGetPublicApisQuery(
    { page: 1, sort: "views", filter: "" },
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) return <Loading />;
  if (error) return (
    <p className="text-center mt-10 text-red-500">Error loading APIs</p>
  );

  // ✅ Now filter them locally based on category
  const categoryApis =
    data?.apis?.filter(
      (api: any) =>
        api?.category?.toLowerCase() === categoryName?.toLowerCase()
    ) || [];

  return (
    <div className="px-4 sm:px-6 mt-19">
      <h1 className="text-3xl font-bold capitalize">
        {categoryName} APIs
      </h1>

      {categoryApis.length > 0 ? (
        <HoverEffect apis={categoryApis} />
      ) : (
        <p className="text-gray-500 mt-5">
          No APIs found in this category.
        </p>
      )}
    </div>
  );
};

export default Category;
