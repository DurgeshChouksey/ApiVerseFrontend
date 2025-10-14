import Card from "@/components/card";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { publicApis } from "@/features/apis/apisSlice";
import TopCategories from "./top-categories";
import BasicPagination from "./pagination";
import Loading from "@/pages/Loading";
import { HoverEffect } from "./ui/card-hover-effect";


const PublicApi = () => {
	const dispatch = useDispatch<AppDispatch>();

	const [publicApi, setPublicApi] = useState<any[]>([]);
	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [sort, setSort] = useState("views");

	const filter = useSelector((state: RootState) => state.apis.filter);

	const fetchPublicApis = async (page = 1) => {
		setLoading(true);
		const { payload } = await dispatch(publicApis({ page, sort, filter }));
		setPublicApi(payload.apis);
		setTotalPages(Math.ceil(payload.total / payload.limit));
		setCurrentPage(payload.page);
		setLoading(false);
	};

	useEffect(() => {
		fetchPublicApis(); // fetch first page on mount
	}, [filter, sort]);

	if (loading) return <Loading />;

	const handleSortChange = (e: any) => {
		setSort(e.target.value);
		fetchPublicApis(1);
	};

	return (
		<div className="md:mt-10">
			{/* Sidebar */}
			<Sidebar />

			{/* Main content */}
			<div className="md:ml-[200px] p-6">
				<TopCategories />

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
					onPageChange={(page) => fetchPublicApis(page)}
					showDemo={false}
				/>
			</div>
		</div>
	);
};

export default PublicApi;
