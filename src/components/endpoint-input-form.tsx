import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useDispatch } from "react-redux";
import { getApi } from "@/features/apis/apiSlice";
import type { AppDispatch } from "@/redux/store";
import { testEndpoint } from "@/features/endpoints/endpointTestSlice";

interface EndpointInputFormProps {
	apiId: string;
	endpointData: any;
}

const EndpointInputForm: React.FC<EndpointInputFormProps> = ({
	apiId,
	endpointData,
}) => {
	const dispatch = useDispatch<AppDispatch>();

	const [api, setApi] = useState<any>({});
	const [formSection, setFormSection] = useState("APIKey");

	const [formValues, setFormValues] = useState<{
		apiKey: string;
		queryParams: Record<string, any>;
		headers: Record<string, any>;
		bodyParams: Record<string, any>;
	}>({
		apiKey: "",
		queryParams: {},
		headers: {},
		bodyParams: {},
	});

	// ✅ Fetch the API details (to check provider auth info)
	const fetchApi = async () => {
		const { payload } = await dispatch(getApi({ apiId }));
		if (payload) setApi(payload);
	};

	useEffect(() => {
		fetchApi();
	}, [apiId]);

	// ✅ Handle input updates
	const handleInputChange = (
		section: "APIKey" | "Params" | "Headers" | "Body",
		key: string,
		value: string
	) => {
		setFormValues((prev) => {
			const newState = { ...prev };
			switch (section) {
				case "APIKey":
					newState.apiKey = value;
					break;
				case "Params":
					newState.queryParams = { ...newState.queryParams, [key]: value };
					break;
				case "Headers":
					newState.headers = { ...newState.headers, [key]: value };
					break;
				case "Body":
					newState.bodyParams = { ...newState.bodyParams, [key]: value };
					break;
			}
			return newState;
		});
	};

	// ✅ Reusable input renderer
	const renderInput = (
		label: string,
		name: string,
		value: string,
		section: "APIKey" | "Params" | "Headers" | "Body",
		required = false,
		placeholderText?: string
	) => (
		<div className="flex flex-col mb-3" key={name}>
			<label className="text-sm mb-1 text-gray-700 dark:text-gray-300">
				{label} {required && <span className="text-red-500">*</span>}
			</label>
			<input
				type="text"
				value={value}
				required={required}
				placeholder={placeholderText || `Enter ${label}`}
				onChange={(e) => handleInputChange(section, name, e.target.value)}
				className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
			/>
		</div>
	);

	// ✅ Render each form section
	const renderFormSection = () => {
		if (!endpointData) return null;

		switch (formSection) {
			// ------------------ API Key ------------------
			case "APIKey": {
				if (!endpointData.api?.requiresApiKey) {
					return (
						<input
							type="text"
							disabled
							placeholder="No API key required"
							className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-400 w-full mb-3"
						/>
					);
				}
				return renderInput(
					"API Key",
					"apiKey",
					formValues.apiKey,
					"APIKey",
					true
				);
			}

			// ------------------ Params ------------------
			case "Params": {
				let queryParams = endpointData.queryParameters || [];

				// ✅ Exclude providerAuthField if defined in API and is in query
				if (api?.providerAuthLocation === "query" && api?.providerAuthField) {
					queryParams = queryParams.filter(
						(param: any) => param.name !== api.providerAuthField
					);
				}

				if (!queryParams.length) {
					return (
						<input
							type="text"
							disabled
							placeholder="No parameters required"
							className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-400 w-full mb-3"
						/>
					);
				}

				return queryParams.map((param: any) =>
					renderInput(
						param.name,
						param.name,
						formValues.queryParams[param.name] || param.example || "",
						"Params",
						param.required,
						param.description
							? `Enter ${param.description}`
							: "Enter parameter value"
					)
				);
			}

			// ------------------ Headers ------------------
			case "Headers": {
				let headers = endpointData.headers || [];

				// ✅ Exclude providerAuthField if defined in API and is in header
				if (api?.providerAuthLocation === "header" && api?.providerAuthField) {
					headers = headers.filter(
						(header: any) => header.name !== api.providerAuthField
					);
				}

				if (!headers.length) {
					return (
						<input
							type="text"
							disabled
							placeholder="No headers required"
							className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-400 w-full mb-3"
						/>
					);
				}

				return headers.map((header: any) =>
					renderInput(
						header.name,
						header.name,
						formValues.headers[header.name] || header.value || "",
						"Headers",
						header.required
					)
				);
			}

			// ------------------ Body ------------------
			case "Body": {
				const bodyParams = endpointData.bodyParameters || [];
				if (!bodyParams.length) {
					return (
						<textarea
							disabled
							placeholder="No body required"
							rows={5}
							className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-400 w-full mb-3 resize-none"
						/>
					);
				}

				return (
					<textarea
						value={JSON.stringify(formValues.bodyParams || {}, null, 2)}
						onChange={(e) => {
							try {
								const parsed = JSON.parse(e.target.value);
								setFormValues((prev) => ({ ...prev, bodyParams: parsed }));
							} catch {
								// ignore invalid JSON
							}
						}}
						placeholder='Enter JSON body, e.g. {"key": "value"}'
						rows={8}
						className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary w-full mb-3 resize-none"
					/>
				);
			}

			default:
				return null;
		}
	};

	// ✅ Testing (mock request)
	const handleTesting = async () => {
		await dispatch(
			testEndpoint({
				apiId,
				endpointId: endpointData.id,
				payload: { ...formValues },
			})
		);
	};

	return (
		<div className="border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md">
			{/* Section Tabs */}
			<div className="flex gap-4 bg-gray-200 dark:bg-[#191819] px-4 py-2 rounded-md mb-4">
				{["APIKey", "Params", "Headers", "Body"].map((section) => (
					<button
						key={section}
						onClick={() => setFormSection(section)}
						className={`px-3 py-1 rounded-md text-sm ${
							formSection === section
								? "bg-primary text-white"
								: "text-gray-700 dark:text-gray-300"
						}`}
					>
						{section}
					</button>
				))}
			</div>

			{/* Render section */}
			{renderFormSection()}

			<Button onClick={handleTesting}>Test Endpoint</Button>

			{/* Hidden debug preview */}
			<pre className="hidden">{JSON.stringify(formValues, null, 2)}</pre>
		</div>
	);
};

export default EndpointInputForm;
