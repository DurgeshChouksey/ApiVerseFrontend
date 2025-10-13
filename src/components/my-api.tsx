import Card from "@/components/card";
import Sidebar from "@/components/sidebar";
import { myApis } from "@/features/apis/apisSlice";
import { redableDate } from "@/lib/redableDates";
import Loading from "@/pages/Loading";
import type { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicPagination from "./pagination";

const MyApi = () => {
	const [myApi, setMyApi] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [sort, setSort] = useState(false);

  const filter = useSelector((state: RootState) => state.apis.filter);

	const dispatch = useDispatch<AppDispatch>();

	async function fetchMyApis(page = 1) {
		setLoading(true);
		const { payload } = await dispatch(myApis({ page, sort, filter }));
    console.log(payload)
		setMyApi(payload.apis);
    console.log(myApi)
		setTotalPages(Math.ceil(payload.total / payload.limit));
		setCurrentPage(payload.page);
		setLoading(false);
	}

	useEffect(() => {
		fetchMyApis();
	}, [filter, sort]);

	if (loading) {
		<Loading />;
	}

	const handleSortChange = (e: any) => {
		setSort(e.target.value);
		fetchMyApis(1);
	};

	return (
		  <div>
        <div className="md:ml-[18%] p-6">
						<h1 className="mt-5 text-3xl font-poppins">My API'S</h1>
            <p className="mt-2 dark:text-gray-300 text-gray-700">This section shows you information regarding APIs that you, your teams or your organizations have created. The scope is determined by your context.</p>

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

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 mt-5">
							{myApi.length > 0 &&
								myApi.map((api) => (
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
					</div>

					<BasicPagination
						totalPages={totalPages}
						currentPage={currentPage}
						siblingsCount={2}
						onPageChange={(page) => fetchMyApis(page)}
						showDemo={false}
					/>
				</div>
	);
};

export default MyApi;
