import Card from "@/components/card";
import { bookmarkedApis } from "@/features/apis/apiSlice";
import { redableDate } from "@/lib/redableDates";
import type { AppDispatch } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "./Loading";

const Bookmark = () => {
	const [bookmarkedApi, setBookmakredApi] = useState([]);
    const [loading, setLoading] = useState(true);

	const dispatch = useDispatch<AppDispatch>();

	async function fetchBookmarkedApis() {
        setLoading(true);
		const { payload }: any = await dispatch(bookmarkedApis());
		setBookmakredApi(payload?.bookmarks);
        setLoading(false);
	}

	useEffect(() => {
		fetchBookmarkedApis();
	}, []);

    if(loading) {
        return <Loading />
    }

	return (
		<div>
			<div className="mt-16">
				<div className="p-6">
					<h1 className="mt-5 text-3xl font-poppins uppercase">Bookmarked</h1>
					<p className="mt-2 dark:text-gray-300 text-gray-700">
						This section shows you information regarding APIs that you, your
						teams or your organizations have created. The scope is determined by
						your context.
					</p>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 mt-5">
						{bookmarkedApi.length > 0 &&
							bookmarkedApi.map(({api}) => (
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
								/>
							))}
					</div>
				</div>

			</div>
		</div>
	);
};

export default Bookmark;
