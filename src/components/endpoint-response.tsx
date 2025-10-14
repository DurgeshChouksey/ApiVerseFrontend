import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import JsonView from "@uiw/react-json-view";
import { darkTheme } from "@uiw/react-json-view/dark";
import { lightTheme } from '@uiw/react-json-view/light';
import { useTheme } from "@/components/theme-provider";

interface ResponseProps {
	response?: {
		status?: number;
		data?: any;
		headers?: any;
	} | null;
}

const Response: React.FC<ResponseProps> = () => {
	const { theme } = useTheme();
	const isDarkMode =
		theme === "dark" ||
		(theme === "system" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches);

	const { response, loading, error } = useSelector(
		(state: RootState) => state.endpointTest
	);

	if (loading) {
		return (
			<div className="mt-6 border-2 border-gray-300 dark:border-gray-700 rounded-md p-4">
				<h3 className="text-lg font-semibold mb-2">Response</h3>
				<p className="text-gray-500 dark:text-gray-400">Loading...</p>
			</div>
		);
	}

	if (!response) {
		return (
			<div className="mt-6 border-2 border-gray-300 dark:border-gray-700 rounded-md p-4">
				<h3 className="text-lg font-semibold mb-2">Response</h3>
				<p className="text-gray-500 dark:text-gray-400">No response yet</p>
			</div>
		);
	}

	const statusColor =
		response.status && response.status >= 200 && response.status < 300
			? "text-green-500"
			: response.status && response.status >= 400
				? "text-red-500"
				: "text-yellow-500";

	return (
		<div className="mt-6 border-2 w-[100%] border-gray-300 dark:border-gray-700 rounded-md p-4">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold">Response</h3>
				<span className={`font-medium ${statusColor}`}>
					Status: {response.status || "Unknown"}
				</span>
			</div>

			{/* Data Section */}
			<div className="mb-6">
				<h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
					Data
				</h4>
				{response.data ? (
					<div className="max-w-[100%] border border-gray-200 dark:border-gray-700 rounded-md p-3 bg-gray-50 dark:bg-[#191819] overflow-auto max-h-[400px]">
						<JsonView
							value={response.data}
							style={isDarkMode ? darkTheme : lightTheme}
						/>
					</div>
				) : (
					<p className="text-gray-500 dark:text-gray-400">No data available</p>
				)}
			</div>

			{/* Headers Section */}
			<div>
				<h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
					Headers
				</h4>
				{response.headers ? (
					<div className="border border-gray-200 dark:border-gray-700 rounded-md p-3 bg-gray-50 dark:bg-[#191819] overflow-auto max-h-[300px]">
						<JsonView
							value={response.headers}
							style={isDarkMode ? darkTheme : lightTheme}
						/>
					</div>
				) : (
					<p className="text-gray-500 dark:text-gray-400">
						No headers available
					</p>
				)}
			</div>
		</div>
	);
};

export default Response;
