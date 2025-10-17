import { getEndpoints } from "@/features/endpoints/endpointSlice";
import type { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";

const Endpoints = ({
	pathname,
	apiId,
}: {
	pathname: string;
	apiId: string | undefined;
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [endpoints, setEndpoints] = useState<any[]>([]);
	const { endpointId } = useParams(); 
	const filter = "";

	useEffect(() => {
		async function fetchEndpoints() {
			if (!apiId) return;
			const { payload } = await dispatch(getEndpoints({ apiId, filter }));

			if (
				payload &&
				Array.isArray(payload) &&
				payload.length > 0 &&
				pathname === `/playground/${apiId}`
			) {
				const firstEndpointId = payload[0].id;
				navigate(`/playground/${apiId}/${firstEndpointId}/test`, {
					replace: true,
				});
			}

			if (payload && Array.isArray(payload)) {
				setEndpoints(payload);
			}
		}

		fetchEndpoints();
	}, [apiId, dispatch]);

	const getMethodColor = (method: string) => {
		switch (method.toUpperCase()) {
			case "GET":
				return "text-blue-500";
			case "POST":
				return "text-green-500";
			case "PUT":
				return "text-yellow-500";
			case "DELETE":
				return "text-red-500";
			default:
				return "text-gray-500";
		}
	};

	return (
		<div>
			{pathname !== "/public" && pathname !== "/workspace" && (
				<div className="text-black dark:text-white md:pt-5 mt-5 border-t-2 dark:border-gray-800">

					<a href={`/api-overview/${apiId}`} className="mt-3 py-1 block md:mx-2 mb-5 md:py-1 rounded-md bg-gray-200 dark:bg-[#191819] text-center">Api Overview</a>
					<h1 className="hidden md:block mx-2 pl-4 py-1 rounded-md">Endpoints</h1>
					<div className="hidden md:block">
						<ul className="border-l-2 border-gray-500 flex flex-col mt-5 ml-6 pl-2 space-y-3">
							{endpoints.length > 0 &&
								endpoints.map((endpoint) => {
									const isActive = endpoint.id === endpointId; // 👈 check if this is the active one
									return (
										<li key={endpoint.id}>
											<Link
												to={`/playground/${apiId}/${endpoint.id}/test`}
												className={`flex gap-2 items-center mr-3 px-2 py-1 rounded-md transition-colors ${
													isActive
														? "bg-primary" // 👈 your theme color
														: "hover:bg-gray-200 dark:hover:bg-gray-800"
												}`}
											>
												<span
													className={`text-[.6rem] ${
														isActive
															? "text-white"
															: getMethodColor(endpoint?.method)
													}`}
												>
													{endpoint?.method}
												</span>
												<span
													className={`text-[.9rem] ${
														isActive
															? "text-white"
															: "text-black dark:text-gray-300"
													}`}
												>
													{endpoint?.name}
												</span>
											</Link>
										</li>
									);
								})}
						</ul>
					</div>
					<div className="block md:hidden mb-5">
						<select
							value={endpointId || ""}
							onChange={(e) => {
								const selectedId = e.target.value;
								if (apiId && selectedId) {
									navigate(`/playground/${apiId}/${selectedId}/test`);
								}
							}}
							className="outline-none rounded-md dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white py-2 px-3"
						>
							<option value="" disabled>
								Select Endpoint
							</option>
							{endpoints.map((endpoint) => {
								const isActive = endpoint.id === endpointId;
								return (
									<option
										key={endpoint.id}
										value={endpoint.id}
										className={isActive ? "font-bold" : ""}
									>
										{`${endpoint.method.toUpperCase()} - ${endpoint.name}`}
									</option>
								);
							})}
						</select>
					</div>
				</div>
			)}
		</div>
	);
};

export default Endpoints;
