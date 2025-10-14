import { bookmarkedApis } from "@/features/apis/apisSlice";
import type { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import Loading from "./Loading";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useEffect, useState } from "react";

const Bookmark = () => {
	const [bookmarkedApi, setBookmakredApi] = useState([]);
    const [loading, setLoading] = useState(true);

	const dispatch = useDispatch<AppDispatch>();

	async function fetchBookmarkedApis() {
        setLoading(true);
		const { payload }: any = await dispatch(bookmarkedApis());
		console.log(payload)
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

					<HoverEffect apis={bookmarkedApi.map((b: any) => b.api)} />
				</div>

			</div>
		</div>
	);
};

export default Bookmark;
