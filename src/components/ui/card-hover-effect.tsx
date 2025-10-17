import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
	Heart,
	ChartNetwork,
	Gauge,
	Ban,
	EllipsisVertical,
} from "lucide-react";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

function readableDate(dateString: string) {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export const HoverEffect = ({
	apis,
	className,
}: {
	apis: any[];
	className?: string;
}) => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div
			className={cn(
				"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-4",
				className
			)}
		>
			{apis.map((api, idx) => (
				<HoverCard
					key={api.id}
					api={api}
					isHovered={hoveredIndex === idx}
					onMouseEnter={() => setHoveredIndex(idx)}
					onMouseLeave={() => setHoveredIndex(null)}
				/>
			))}
		</div>
	);
};

function HoverCard({
	api,
	isHovered,
	onMouseEnter,
	onMouseLeave,
}: {
	api: any;
	isHovered: boolean;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}) {
	const navigate = useNavigate();
	const location = useLocation();

	const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

	function dropdownMenu() {
    setMenuOpen(!isMenuOpen);
	}

	function handleNavigation() {
    if (location.pathname.startsWith("/studio")) {
      navigate(`/studio/${api.id}/publish/general`);
		} else {
      navigate(`/playground/${api.id}`);
		}
	}

  const [bookmarked, setBookmarked] = useState(api?.isBookmarked);

	async function handleBookmark() {
		if (!bookmarked) {
			await fetchWithAuth(`/api/v1/apis/${api.id}/bookmark`, {
				method: "POST",
			});
			setBookmarked(true);
		} else {
			await fetchWithAuth(`/api/v1/apis/${api.id}/bookmark`, {
				method: "DELETE",
			});
			setBookmarked(false);
		}
	}

	return (
		<div
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className="relative group p-2 h-full w-full"
		>
			<AnimatePresence>
				{isHovered && (
					<motion.span
						className="absolute inset-0 h-full w-full bg-primary block rounded-3xl"
						layoutId="hoverBackground"
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
							transition: { duration: 0.15 },
						}}
						exit={{
							opacity: 0,
							transition: { duration: 0.15, delay: 0.2 },
						}}
					/>
				)}
			</AnimatePresence>

			<div className="rounded-2xl h-full w-full p-4 overflow-hidden bg-white dark:bg-black border dark:border-white/[0.2] group-hover:border-slate-700 relative z-20">
				<div className="relative z-50 p-4">
					{/* Top section */}
					<div className="mb-2 w-full flex items-center justify-between gap-x-2 text-xs">
						<div className="text-white border-black bg-red-500 px-3 py-1 font-bold dark:border-white rounded-md">
							{api?.category}
						</div>
						<div className="flex gap-2">
							<button
								onClick={handleBookmark}
								aria-label="Bookmark API"
								className="text-2xl leading-none"
							>
								<Heart color={bookmarked ? "red" : "#9ca3af"} />
							</button>
							{location.pathname.startsWith("/studio") && (
								<button onClick={dropdownMenu}>
									<EllipsisVertical />
								</button>
							)}
						</div>
					</div>

          {/* dropdown menu */}
          {isMenuOpen && <div className="bg-black rounded-md flex flex-col w-fit px-2 py-1 absolute right-10 top-0 border-2 border-primary">
            <button onClick={() => navigate(`/studio/${api.id}/publish`)}  className="text-[0.8rem] sm:text-[1rem]" >Edit</button>
            <button onClick={() => navigate(`/studio/${api.id}/manage`)} className="text-[0.8rem] sm:text-[1rem]">Manage</button>
          </div>}

					{/* API title and description */}
					<h3
						onClick={handleNavigation}
						className="cursor-pointer mt-3 text-xl font-black uppercase group-hover:text-primary dark:text-white text-black"
					>
						{api?.name}
					</h3>
					<p
						onClick={handleNavigation}
						className="cursor-pointer text-md mt-5 border-l-4 border-red-500 pl-4 text-gray-700 dark:text-gray-300"
					>
						{api?.description}
					</p>

					{/* Owner and updated date */}
					<div className="mt-3 flex items-center justify-between w-full text-sm text-gray-600 dark:text-gray-400">
						<div>By {api?.owner?.username ?? "Unknown"}</div>
						<div>{readableDate(api?.updatedAt)}</div>
					</div>

					{/* Stats */}
					<div className="mt-6 w-full flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
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
				</div>
			</div>
		</div>
	);
}
