
const TopCategories = ({ publicApi }: any) => {

	// Calculate top categories
	const categoryCounts = publicApi.reduce(
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
			<h1 className="mt-10 text-3xl font-poppins">TOP CATEGORIES</h1>
			<div className="mt-5 flex gap-6 flex-col sm:flex-row">
				{topCategories.map((category) => (
					<div
						key={category}
						className="border-2 border-black dark:border-white  rounded-md flex flex-col items-start p-4 gap-2 hover:border-primary hover:dark:border-primary"
					>
						<div className="font-semibold text-lg">{category}</div>
						<div className="text-sm text-gray-600">
							APIs offer tools for developers to bolster the security of their
							applications and systems...
						</div>
						<button className="mt-2 text-sm px-3 py-1 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white rounded transition duration-700">
							Browse Category
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default TopCategories;
