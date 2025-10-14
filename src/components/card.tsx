import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { ChartNetwork, Gauge, Heart, Ban } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function readableDate(dateString: string) {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export default function Card({ api }: { api: any }) {
	const navigate = useNavigate();
	const [bookmarked, setBookmarked] = useState(api?.isBookmarked);

	async function handleBookmark() {
		if (!bookmarked) {
			await fetchWithAuth(`/api/v1/apis/${api.id}/bookmark`, { method: "POST" });
			setBookmarked(true);
		} else {
			await fetchWithAuth(`/api/v1/apis/${api.id}/bookmark`, { method: "DELETE" });
			setBookmarked(false);
		}
	}

	return (
		<article className="bg-background flex w-full rounded-md flex-col items-start border-2 border-black p-6 dark:border-white hover:border-primary hover:dark:border-primary">
			{/* Top section */}
			<div className="mb-2 w-full flex items-center justify-between gap-x-2 text-xs">
				<div className="text-white border-black bg-red-500 px-3 py-1 font-bold dark:border-white rounded-md">
					{api?.category}
				</div>
				<button
					onClick={handleBookmark}
					aria-label="Bookmark API"
					className="text-2xl leading-none"
				>
					<Heart color={bookmarked ? "red" : "#9ca3af"} />
				</button>
			</div>

			{/* API title and description */}
			<div className="group relative">
				<h3
					onClick={() => navigate(`/playground/${api.id}`)}
					className="cursor-pointer text-foreground mt-3 text-xl font-black uppercase group-hover:text-primary"
				>
					{api?.name}
				</h3>
				<p
					onClick={() => navigate(`/playground/${api.id}`)}
					className="cursor-pointer text-md mt-5 border-l-4 border-red-500 pl-4 text-gray-800 dark:text-gray-300"
				>
					{api?.description}
				</p>
			</div>

			{/* Owner and last updated */}
			<div className="mt-3 flex items-center justify-between w-full text-sm">
				<div>By {api?.owner?.username ?? "Unknown"}</div>
				<div>{readableDate(api?.updatedAt)}</div>
			</div>

			{/* Stats */}
			<div className="mt-6 w-full flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
				<div className="flex items-center gap-x-1">
					<ChartNetwork size={18} />
					<span>{api?.apiLogs?.[0]?.totalCalls ?? 0} calls</span>
				</div>
				<div className="flex items-center gap-x-1">
					<Ban size={18} />
					<span>{api?.apiLogs?.[0]?.totalErrors ?? 0} errors</span>
				</div>
				<div className="flex items-center gap-x-1">
					<Gauge size={18} />
					<span>
						{typeof api?.apiLogs?.[0]?.averageLatency === "number"
							? `${api.apiLogs[0].averageLatency.toFixed(1)} ms`
							: "0 ms"}
					</span>
				</div>
			</div>
		</article>
	);
}
