import { fetchWithAuth } from "@/lib/fetchWithAuth";
import type { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TopCategories = () => {

	const payload : any = useSelector<RootState>(state => state.apis);


	if (!payload.data?.totalApis?.length) {
		return null; // render nothing only on first load when no data
	}

	const publicApi = payload?.data?.totalApis || [];


	// Calculate top categories
	const categoryCounts = publicApi.length > 0 && publicApi.reduce(
		(acc : any, api : any) => {
			if (api.category) {
				acc[api.category] = (acc[api.category] || 0) + 1;
			}
			return acc;
		},
		{} as Record<string, number>
	);

	const topCategories = Object.entries(categoryCounts)
		.sort((a: any, b: any) => b[1] - a[1])
		.slice(0, 4)
		.map(([category]) => category);

	return (
		<div>
			<h1 className="sm:mt-5 text-3xl font-poppins">TOP CATEGORIES</h1>
			<div className="mt-5 flex gap-6 flex-col sm:flex-row">
				{topCategories.map((category) => (
					<div
						key={category}
						className="border-2 border-black dark:border-white  rounded-md flex flex-col items-start p-4 gap-2 hover:border-primary hover:dark:border-primary"
					>
						<div className="font-semibold text-lg">{category}</div>
						<div className="text-sm text-gray-700 dark:text-gray-300">
							APIs offer tools for developers to bolster the security of their
							applications and systems...
						</div>
						<button className="mt-2 text-sm px-3 py-1 text-black bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary dark:text-white rounded transition duration-700">
							Browse Category
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default TopCategories;
