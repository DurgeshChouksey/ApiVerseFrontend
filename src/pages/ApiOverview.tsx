import React, { useEffect, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { MoveLeft } from "lucide-react";

const ApiOverview = () => {
    const navigate = useNavigate();
	const { apiId } = useParams();
	const [docs, setDocs] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const { theme } = useTheme();

	// Determine dark mode
	const isDarkMode =
		theme === "dark" ||
		(theme === "system" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches);

	useEffect(() => {
		const fetchDocs = async () => {
			setLoading(true);
			try {
				const res = await fetchWithAuth(`/api/v1/apis/${apiId}/docs`);
				setDocs(res?.content || ""); // markdown content from backend
			} catch (error) {
				console.error("Failed to fetch docs:", error);
			} finally {
				setLoading(false);
			}
		};

		if (apiId) fetchDocs();
	}, [apiId]);

	if (loading) return <div>Loading API docs...</div>;

	return (
		<div className="p-4 mt-16">
			<div onClick={() => navigate(`/playground/${apiId}`)} className="cursor-pointer flex gap-4">
                <MoveLeft></MoveLeft>
                <p>Endpoints</p>
            </div>
            <h1 className="text-2xl mt-4 font-bold ">API Documentation Preview</h1>
			<div className="rounded-md bg-gray-50 dark:bg-gray-800 mt-5">
				<MarkdownPreview
					source={docs}
					style={{
						padding: 16,
						borderRadius: 8,
						overflow: "auto",
						minHeight: 400,
					}}
					wrapperElement={{ "data-color-mode": isDarkMode ? "dark" : "light" }}
				/>
			</div>
		</div>
	);
};

export default ApiOverview;
