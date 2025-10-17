import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

const DocsEditor = ({
	initialContent = "",
	onSave,
	successMessage = "",
	errorMessage = "",
}: {
	initialContent?: string;
	onSave: (data: string) => void;
	successMessage?: string;
	errorMessage?: string;
}) => {
	const { theme } = useTheme();
	const isDarkMode =
		theme === "dark" ||
		(theme === "system" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches);

	const [value, setValue] = useState<string>(initialContent);

	const handleSave = () => {
		onSave(value);
	};

	return (
		<div className="w-full">
			<h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
				API Documentation
			</h2>

			<div data-color-mode={isDarkMode ? "dark" : "light"}>
				<div className="rounded-md">
					<MDEditor
						value={value}
						onChange={(val) => setValue(val || "")}
						height={500}
						data-color-mode={isDarkMode ? "dark" : "light"} // key line for dark/light mode
					/>
				</div>
			</div>

			{/* Save Button */}
			<div className="flex justify-between items-center mt-4">
				<div>
					{successMessage && (
						<p className="text-xl text-green-500">{successMessage}</p>
					)}
					{errorMessage && (
						<p className="text-xl text-red-500">{errorMessage}</p>
					)}
				</div>
				<Button onClick={handleSave} >Save</Button>
			</div>
		</div>
	);
};

export default DocsEditor;
