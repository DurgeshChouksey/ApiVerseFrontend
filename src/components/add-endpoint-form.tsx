import React, { useMemo, useState, useEffect } from "react";
import BodyFormData from "./body-form";
import {
	useCreateEndpointMutation,
	useUpdateEndpointMutation,
} from "@/features/endpoints/endpointsApi";
import { useParams } from "react-router-dom";

type Field = {
	name: string;
	type: string;
	description: string;
	required: boolean;
};

const FIELD_TYPES = ["string", "number", "boolean", "array", "object"];

const HTTP_METHODS = [
	"GET",
	"POST",
	"PUT",
	"PATCH",
	"DELETE",
	"HEAD",
	"OPTIONS",
];

type AddEndpointFormProps = {
	onCancel?: () => void;
	onSubmit?: (data: {
		name: string;
		description: string;
		method: string;
		path: string;
		headers?: Field[];
		query?: Field[];
		body?: Field[] | string;
	}) => void;
	initialData?: {
		id: string;
		name: string;
		description: string;
		method: string;
		path: string;
		headers?: Field[];
		queryParameters?: Field[];
		bodyParameters?: Field[] | string;
		bodyContentType?: string;
		payloadName?: string;
		payloadDescription?: string;
	} | null;
};

// --- Table Component for Headers/Query ---
const FieldTable: React.FC<{
	fields: Field[];
	onChange: (fields: Field[]) => void;
}> = ({ fields, onChange }) => {
	const handleFieldChange = (index: number, key: keyof Field, value: any) => {
		const updated: Field[] = [...fields];
		(updated[index] as Record<keyof Field, any>)[key] = value;

		// Add new empty row when typing in last row name
		if (key === "name" && index === fields.length - 1 && value.trim() !== "") {
			updated.push({
				name: "",
				type: "string",
				description: "",
				required: false,
			} as Field);
		}

		// Remove empty rows (except last)
		if (key === "name" && value.trim() === "" && index !== fields.length - 1) {
			updated.splice(index, 1);
		}

		// Ensure at least one empty row exists
		if (updated.length === 0) {
			updated.push({
				name: "",
				type: "string",
				description: "",
				required: false,
			});
		}

		onChange(updated);
	};

	const handleDelete = (index: number) => {
		const updated = fields.filter((_, i) => i !== index);
		if (updated.length === 0) {
			updated.push({
				name: "",
				type: "string",
				description: "",
				required: false,
			});
		}
		onChange(updated);
	};

	return (
		<div className="overflow-x-auto mt-4">
			<table className="min-w-full border border-border rounded-md">
				<thead className="bg-muted/20">
					<tr>
						<th className="text-left px-6 py-2 text-sm font-medium min-w-[120px]">
							Name *
						</th>
						<th className="text-left px-6 py-2 text-sm font-medium min-w-[100px]">
							Type
						</th>
						<th className="text-left px-6 py-2 text-sm font-medium min-w-[160px]">
							Description
						</th>
						<th className="text-left px-6 py-2 text-sm font-medium min-w-[100px]">
							Required
						</th>
						<th className="text-left px-6 py-2 text-sm font-medium min-w-[120px]">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{fields.map((field, index) => (
						<tr key={index} className="border-t border-border">
							<td className="px-3 py-2">
								<input
									type="text"
									required={index !== fields.length - 1}
									value={field.name}
									onChange={(e) =>
										handleFieldChange(index, "name", e.target.value)
									}
									className="w-full px-2 py-1 rounded-md border border-border bg-background text-foreground"
								/>
							</td>
							<td className="px-3 py-2">
								<select
									value={field.type}
									onChange={(e) =>
										handleFieldChange(index, "type", e.target.value)
									}
									className="w-full px-2 py-1 rounded-md border border-border bg-background text-foreground"
								>
									{FIELD_TYPES.map((t) => (
										<option key={t}>{t}</option>
									))}
								</select>
							</td>
							<td className="px-3 py-2">
								<input
									type="text"
									value={field.description}
									onChange={(e) =>
										handleFieldChange(index, "description", e.target.value)
									}
									className="w-full px-2 py-1 rounded-md border border-border bg-background text-foreground"
								/>
							</td>
							<td className="px-3 py-2 text-center">
								<input
									type="checkbox"
									checked={field.required}
									onChange={(e) =>
										handleFieldChange(index, "required", e.target.checked)
									}
								/>
							</td>
							<td className="px-7 py-2 flex flex-col sm:flex-row gap-2">
								<button
									type="button"
									onClick={() => handleDelete(index)}
									className="text-red-500 text-sm"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

// --- Main Component ---
const AddEndpointForm: React.FC<AddEndpointFormProps> = ({
	onCancel,
	initialData,
}) => {
	const isEditMode = !!initialData;

	const [activeTab, setActiveTab] = useState("Headers");

	const [name, setName] = useState(initialData?.name || "");
	const [description, setDescription] = useState(
		initialData?.description || ""
	);
	const [method, setMethod] = useState(initialData?.method || "GET");
	const [path, setPath] = useState(initialData?.path || "");

	// Separate states for Headers, Query, and Body
	const [headersFields, setHeadersFields] = useState<Field[]>([
		{ name: "", type: "string", description: "", required: false },
	]);
	const [queryFields, setQueryFields] = useState<Field[]>([
		{ name: "", type: "string", description: "", required: false },
	]);

	type BodyData = {
		mediaType: string;
		payloadName: string;
		payloadDescription: string;
		bodyContent: string;
		fields: Field[];
	};

	const [bodyData, setBodyData] = useState<BodyData>({
		mediaType: "application/json",
		payloadName: "",
		payloadDescription: "",
		bodyContent: "",
		fields: [{ name: "", type: "string", description: "", required: false }],
	});
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [updating, setUpdating] = useState<boolean>(false);

	useEffect(() => {
		if (initialData) {
			// ✅ Pre-fill headers
			if (initialData.headers && Array.isArray(initialData.headers)) {
				setHeadersFields(
					initialData.headers.length > 0
						? [...initialData.headers]
						: [{ name: "", type: "string", description: "", required: false }]
				);
			}

			// ✅ Pre-fill query parameters
			if (
				initialData.queryParameters &&
				Array.isArray(initialData.queryParameters)
			) {
				setQueryFields(
					initialData.queryParameters.length > 0
						? [...initialData.queryParameters]
						: [{ name: "", type: "string", description: "", required: false }]
				);
			}

			// ✅ Pre-fill body
			if (initialData.bodyParameters) {
				if (initialData.bodyContentType === "form-data") {
					setBodyData({
						mediaType: initialData.bodyContentType || "application/json",
						payloadName: initialData.payloadName || "",
						payloadDescription: initialData.payloadDescription || "",
						bodyContent: "",
						fields:
							Array.isArray(initialData.bodyParameters) &&
							initialData.bodyParameters.length > 0
								? [...initialData.bodyParameters]
								: [
										{
											name: "",
											type: "string",
											description: "",
											required: false,
										},
									],
					});
				} else {
					setBodyData({
						mediaType: initialData.bodyContentType || "application/json",
						payloadName: initialData.payloadName || "",
						payloadDescription: initialData.payloadDescription || "",
						bodyContent:
							typeof initialData.bodyParameters === "string"
								? initialData.bodyParameters
								: JSON.stringify(initialData.bodyParameters, null, 2),
						fields: [
							{ name: "", type: "string", description: "", required: false },
						],
					});
				}
			}
		}
	}, [initialData]);

	const isValid = useMemo(() => name.trim().length > 0, [name]);

	const { apiId } = useParams<{ apiId: string }>();
	const [createEndpoint] = useCreateEndpointMutation();
	const [updateEndpoint] = useUpdateEndpointMutation();

	async function handleCreateEndpoint(data: any) {
		if (!apiId) return;
		setUpdating(true);
		try {
			const res = await createEndpoint({ apiId, data }).unwrap();
			setSuccessMessage(res.message);
		} catch (error: any) {
			setErrorMessage("Something went wrong!");
		}
		setUpdating(false);
	}

	async function handleEditEndpoint(data: any) {
		if (!apiId || !initialData) return;
		setUpdating(true);
		try {
			const res = await updateEndpoint({
				apiId,
				endpointId: initialData.id,
				data,
			}).unwrap();
			setSuccessMessage(res.message);
		} catch (error: any) {
			setErrorMessage("Something went wrong!");
		}
		setUpdating(false);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!isValid) return;

		const headers = headersFields.filter((f) => f.name.trim() !== "");
		const queryParams = queryFields.filter((f) => f.name.trim() !== "");
		const bodyParams =
			bodyData.mediaType === "form-data"
				? bodyData.fields.filter((f: any) => f.name.trim() !== "")
				: bodyData.bodyContent;
		const bodyContentType = bodyData.mediaType;

		const endpointDetails = {
			name: name.trim(),
			path: path.trim(),
			method,
			description: description.trim(),
			queryParameters: queryParams,
			bodyParameters: bodyParams,
			bodyContentType,
			headers,
		};

		console.log("🚀 Endpoint Details:", endpointDetails);

		if (isEditMode) {
			handleEditEndpoint(endpointDetails);
		} else {
			handleCreateEndpoint(endpointDetails);
		}
	}

	return (
		<div className="rounded-md shadow-sm p-4 md:p-6 flex flex-col h-fit">
			<h2 className="text-2xl font-semibold text-gray-300 mb-2">
				{isEditMode ? "Edit Endpoint" : "Add Endpoint"}
			</h2>

			<form onSubmit={handleSubmit} className="mt-4 space-y-4">
				{/* --- Basic Info --- */}
				<div>
					<label className="block text-sm text-foreground mb-1">
						Name<span className="text-red-500"> *</span>
					</label>
					<input
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Endpoint name"
						className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground"
					/>
				</div>

				<div>
					<label className="block text-sm text-foreground mb-1">
						Description<span className="text-red-500"> *</span>
					</label>
					<textarea
						required
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Describe this endpoint"
						rows={3}
						className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground"
					/>
				</div>

				<div className="flex flex-col sm:flex-row gap-3 items-start">
					<div className="sm:w-[140px] w-full">
						<label className="block text-sm text-foreground mb-1">Method</label>
						<select
							value={method}
							onChange={(e) => setMethod(e.target.value)}
							className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground"
						>
							{HTTP_METHODS.map((m) => (
								<option key={m}>{m}</option>
							))}
						</select>
					</div>
					<div className="flex-1 w-full">
						<label className="block text-sm text-foreground mb-1">Path</label>
						<input
							value={path}
							onChange={(e) => setPath(e.target.value)}
							placeholder="/users/{id}"
							className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground"
						/>
						<p className="text-xs text-gray-500 mt-1">
							Use <code>{"{curly braces}"}</code> for path params, e.g.{" "}
							<code>/employees/{"{id}"}</code>
						</p>
					</div>
				</div>

				{/* --- Tabs --- */}
				<div className="flex gap-6 border-b border-border mt-2">
					{["Headers", "Query", "Body"].map((tab) => (
						<button
							key={tab}
							type="button"
							onClick={() => setActiveTab(tab)}
							className={`pb-2 text-sm font-medium transition-colors ${
								activeTab === tab
									? "text-primary border-b-2 border-primary"
									: "text-muted-foreground hover:text-foreground border-b-2 border-transparent"
							}`}
						>
							{tab}
						</button>
					))}
				</div>

				{/* --- Headers Tab --- */}
				{activeTab === "Headers" && (
					<FieldTable fields={headersFields} onChange={setHeadersFields} />
				)}

				{/* --- Query Tab --- */}
				{activeTab === "Query" && (
					<FieldTable fields={queryFields} onChange={setQueryFields} />
				)}

				{/* --- Body Tab --- */}
				{activeTab === "Body" &&
					(method === "GET" ? (
						<p className="mt-4 text-red-500 text-sm">
							Body parameters are not permitted for GET method.
						</p>
					) : (
						<BodyFormData value={bodyData} onChange={setBodyData} />
					))}

				<div className="flex justify-between items-center">
					<div>
						{updating && <p className="text-xl text-yellow-500">updating...</p>}
						{successMessage && (
							<p className="text-xl text-green-500">{successMessage}</p>
						)}
						{errorMessage && (
							<p className="text-xl text-red-500">{errorMessage}</p>
						)}
					</div>

					{/* --- Buttons --- */}
					<div className="flex gap-3">
						<button
							type="button"
							onClick={onCancel}
							className="px-3 py-2 text-sm rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={!isValid}
							className={`px-3 py-2 text-sm rounded-md border border-border bg-background ${
								isValid
									? "hover:bg-primary/10"
									: "opacity-50 cursor-not-allowed"
							}`}
						>
							{isEditMode ? "Save Changes" : "Save Endpoint"}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddEndpointForm;
