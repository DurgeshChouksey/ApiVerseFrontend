import Card from "@/components/card";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { publicApis } from "@/features/apis/apiSlice";
import { redableDate } from "@/lib/redableDates";
import TopCategories from "./top-categories";
import BasicPagination from "./pagination";
import Loading from "@/pages/Loading";

const PublicApi = () => {
	const dispatch = useDispatch<AppDispatch>();

	// to fetch public api
	const [publicApi, setPublicApi] = useState<any[]>([]);
	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [sort, setSort] = useState(false);

	const fetchPublicApis = async (page = 1) => {
		setLoading(true);
		const { payload } = await dispatch(publicApis({ page, sort }));
		setPublicApi(payload.apis);
		setTotalPages(Math.ceil(payload.total / payload.limit));
		setCurrentPage(payload.page);
		setLoading(false);
	};

	useEffect(() => {
		fetchPublicApis(); // fetch first page on mount
	}, [sort]);

	if (loading) {
		<Loading />;
	}

	const handleSortChange = (e: any) => {
		setSort(e.target.value);
		fetchPublicApis(1);
	};


	return (
		<div>
			<div className="mt-30 md:mt-10">
				<div>
					{/* left */}
					<Sidebar />

					{/* right */}
					<div className="md:ml-[200px] p-6">
						{/* top categories */}
						<TopCategories />

						<h1 className="mt-10 text-3xl font-poppins">PUBLIC API'S</h1>


						{/* sorting */}
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

						<div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6">
							{publicApi.length > 0 &&
								publicApi.map((api) => (
									<Card
										key={api?.id}
										apiId={api?.id}
										name={api?.name}
										description={api?.description}
										ownerName={api?.owner?.username}
										category={api?.category}
										lastUpdate={redableDate(api.updatedAt)}
										totalCalls={api?.apiLogs[0]?.totalCalls}
										totalErrors={api?.apiLogs[0]?.totalErrors}
										averageLatency={api?.apiLogs[0]?.averageLatency}
										isBookmarked={api?.isBookmarked}
									/>
								))}
						</div>
						<BasicPagination
							totalPages={totalPages}
							currentPage={currentPage}
							siblingsCount={2}
							onPageChange={(page) => fetchPublicApis(page)}
							showDemo={false}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PublicApi;
