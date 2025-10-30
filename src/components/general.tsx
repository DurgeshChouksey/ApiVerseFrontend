import { getApi } from "@/features/apis/apiSlice";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import Loading from "@/pages/Loading";
import type { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Eye } from 'lucide-react';
import { useGetApiByIdQuery } from "@/features/apis/apisApi";


const General = () => {
	const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "https://raw.githubusercontent.com/DurgeshChouksey/ApiVersePublicUtilities/main/public/temp-api-logo.png",
    baseUrl: "",
    category: "",
    visibility: "public",
    requiresApiKey: "false",
    providerAuthType: "",
    providerAuthLocation: "",
    providerAuthField: "",
    providerAuthKey: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAuthKey, setShowAuthKey] = useState(false);
  const [updating, setUpdating] = useState(false);

  const { apiId } = useParams();

  // RTK Query hook to fetch API by ID
  const { data: api, isLoading, error } = useGetApiByIdQuery(apiId!);

  // Populate formData once API data is loaded
  useEffect(() => {
    if (!api) return;
    setFormData({
      name: api.name || "",
      description: api.description || "",
      logo: api.logo || "https://raw.githubusercontent.com/DurgeshChouksey/ApiVersePublicUtilities/main/public/temp-api-logo.png",
      baseUrl: api.baseUrl || "",
      category: api.category || "",
      visibility: api.visibility || "public",
      requiresApiKey: api.requiresApiKey ? "true" : "false",
      providerAuthType: api.providerAuthType || "",
      providerAuthLocation: api.providerAuthLocation || "",
      providerAuthField: api.providerAuthField || "",
      providerAuthKey: api.providerAuthKey || "",
    });
  }, [api]);

  if (isLoading) return <Loading />;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
	  setUpdating(true);
	  try {
      const res = await fetchWithAuth(`/api/v1/apis/${apiId}`, {
        method: "PATCH",
        data: {
          ...formData,
          requiresApiKey: formData.requiresApiKey === "true",
        },
      });
      setErrorMessage("");
      setSuccessMessage(res?.message);
    } catch (error: any) {
      setSuccessMessage("");
      setErrorMessage(error?.response?.data?.title);
    }
	setUpdating(false);
  };

  const handleDiscard = () => {
    if (!api) return;
    setFormData({
      name: api.name || "",
      description: api.description || "",
      logo: api.logo || "https://raw.githubusercontent.com/DurgeshChouksey/ApiVersePublicUtilities/main/public/temp-api-logo.png",
      baseUrl: api.baseUrl || "",
      category: api.category || "",
      visibility: api.visibility || "public",
      requiresApiKey: api.requiresApiKey ? "true" : "false",
      providerAuthType: api.providerAuthType || "",
      providerAuthLocation: api.providerAuthLocation || "",
      providerAuthField: api.providerAuthField || "",
      providerAuthKey: api.providerAuthKey || "",
    });
  };

	return (
		<div className="border rounded-md">
			<h2 className="bg-white dark:bg-[#121212] text-xl font-semibold p-3 border-b">
				General Details of API
			</h2>

			<form className="p-5 flex flex-col gap-4">
				{/* Name */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
						Name
					</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
						placeholder="Enter API name"
					/>
				</div>

				{/* Description */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
						Description
					</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
						className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
						rows={3}
						placeholder="Enter API description"
					/>
				</div>

				{/* Logo */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
						Logo URL
					</label>
					<input
						type="text"
						name="logo"
						value={formData.logo}
						onChange={handleChange}
						className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
						placeholder="Enter logo URL"
					/>
				</div>

				{/* Base URL */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
						Base URL
					</label>
					<input
						type="text"
						name="baseUrl"
						value={formData.baseUrl}
						onChange={handleChange}
						className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
						placeholder="https://api.example.com/v1"
					/>
				</div>

				{/* Category */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
						Category
					</label>
					<input
						type="text"
						name="category"
						value={formData.category}
						onChange={handleChange}
						className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
						placeholder="Enter category"
					/>
				</div>

				{/* Visibility */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
						Visibility
					</label>
					<select
						name="visibility"
						value={formData.visibility}
						onChange={handleChange}
						className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
					>
						<option value="public">Public</option>
						<option value="private">Private</option>
					</select>
				</div>

				{/* Requires API Key */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
						Requires API Key
					</label>
					<select
						name="requiresApiKey"
						value={formData.requiresApiKey}
						onChange={handleChange}
						className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
					>
						<option value="false">No</option>
						<option value="true">Yes</option>
					</select>
				</div>

				{/* Provider Auth Type */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
						Provider Auth Type
					</label>
					<input
						type="text"
						name="providerAuthType"
						value={formData.providerAuthType}
						onChange={handleChange}
						className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
						placeholder='e.g. "apiKey", "oauth2"'
					/>
				</div>

				{/* Provider Auth Location */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
						Provider Auth Location
					</label>
					<input
						type="text"
						name="providerAuthLocation"
						value={formData.providerAuthLocation}
						onChange={handleChange}
						className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
						placeholder='e.g. "query" or "header"'
					/>
				</div>

				{/* Provider Auth Field */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
						Provider Auth Field
					</label>
					<input
						type="text"
						name="providerAuthField"
						value={formData.providerAuthField}
						onChange={handleChange}
						className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
						placeholder='e.g. "apiId" or "X-API-KEY"'
					/>
				</div>

				{/* Provider Auth Key */}
				<div className="relative">
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
						Provider Auth Key
					</label>
					<input
						type={showAuthKey ? "text" : "password"}
						name="providerAuthKey"
						value={formData.providerAuthKey}
						onChange={handleChange}
						className="mt-1 w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
						placeholder="Enter encrypted key/token"
					/>

					<button
						type="button"
						onClick={() => setShowAuthKey((prev) => !prev)}
						className="absolute right-3 top-9 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
					>
						{/* {showAuthKey ? "Hide" : "Show"} */}

						<Eye size={20} ></Eye>
					</button>
				</div>

				{/* Buttons */}
				<div className="flex items-center justify-between mt-3">
					<div>
						{updating && (
							<p className="text-xl text-yellow-500">updating...</p>
						)}
						{successMessage && (
							<p className="text-xl text-green-500">{successMessage}</p>
						)}
						{errorMessage && (
							<p className="text-xl text-red-500">{errorMessage}</p>
						)}
					</div>
					<div className="flex justify-end gap-4 ">
						<button
							type="button"
							onClick={handleUpdate}
							className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
						>
							Save
						</button>
						<button
							type="button"
							onClick={handleDiscard}
							className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-600"
						>
							Discard
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default General;
