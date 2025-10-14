import type { RootState } from "@/redux/store";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { useSelector } from "react-redux";

const TopCategories = () => {
  const payload: any = useSelector<RootState>((state) => state.apis);

  if (!payload.data?.totalApis?.length) {
    return null; // render nothing on first load when no data
  }

  const publicApi = payload?.data?.totalApis || [];

  // Calculate top categories with dummy description
  const categoryCounts =
    publicApi.length > 0
      ? publicApi.reduce((acc: any, api: any) => {
          if (api.category) acc[api.category] = (acc[api.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      : {};

  const topCategories = Object.entries(categoryCounts)
    .sort((a: any, b: any) => b[1] - a[1])
    .slice(0, 4)
    .map(([category]) => ({
      category,
      description:
        "APIs offer tools for developers to bolster the security of their applications and systems...",
    }));

  return (
    <div className="relative w-full">
      <h1 className="sm:mt-5 text-3xl font-poppins">TOP CATEGORIES</h1>

      {/* Infinite moving cards */}
      <div className="mt-5">
        <InfiniteMovingCards
          items={topCategories}
          direction="right"
          speed="slow"
          className="max-w-full"
        />
      </div>
    </div>
  );
};

export default TopCategories;
