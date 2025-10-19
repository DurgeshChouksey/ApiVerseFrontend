import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useGetApiByIdQuery } from "@/features/apis/apisApi";
import {
  useCheckSubscriptionQuery,
  useGetApiKeyQuery,
} from "@/features/subscription/subscriptionApi";
import { testEndpoint } from "@/features/endpoints/endpointTestSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";

interface EndpointInputFormProps {
  apiId: string;
  endpointData: any;
}

const EndpointInputForm: React.FC<EndpointInputFormProps> = ({ apiId, endpointData }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formSection, setFormSection] = useState("APIKey");

  const [formValues, setFormValues] = useState<{
    queryParams: Record<string, any>;
    headers: Record<string, any>;
    bodyParams: Record<string, any>;
  }>({
    queryParams: {},
    headers: {},
    bodyParams: {},
  });

  // RTK Query hooks
  const { data: api } = useGetApiByIdQuery(apiId);
  const { data: subscriptionData } = useCheckSubscriptionQuery(apiId);
  const { data: apiKeyData } = useGetApiKeyQuery(apiId);

  // Update local API key field
  useEffect(() => {
    if (apiKeyData?.apiKey) {
      setFormValues((prev) => ({ ...prev, apiKey: apiKeyData.apiKey }));
    } else {
      setFormValues((prev) => ({ ...prev, apiKey: "" }));
    }
  }, [apiKeyData]);

  // Handle input changes
  const handleInputChange = (
    section: "Params" | "Headers" | "Body",
    key: string,
    value: string
  ) => {
    setFormValues((prev) => {
      const newState = { ...prev };
      switch (section) {
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

  // Render inputs
  const renderInput = (label: string, name: string, value: string, section: "Params" | "Headers" | "Body", required = false, placeholderText?: string) => (
    <div className="flex flex-col mb-3" key={name}>
      <label className="text-sm mb-1 text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        value={value ?? ""}
        required={required}
        placeholder={placeholderText || `Enter ${label}`}
        onChange={(e) => handleInputChange(section, name, e.target.value)}
        className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );

  // Render form section
  const renderFormSection = () => {
    if (!endpointData) return null;

    switch (formSection) {
      case "APIKey":
        return (
          <input
            type="text"
            value={api?.requiresApiKey ? apiKeyData?.apiKey || "Subscribe to get an API key*" : ""}
            disabled
            className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-400 w-full mb-3"
          />
        );

      case "Params":
        let queryParams = endpointData.queryParameters || [];
        if (api?.providerAuthLocation === "query" && api?.providerAuthField) {
          queryParams = queryParams.filter((p: any) => p.name !== api.providerAuthField);
        }
        if (!queryParams.length) return <input type="text" disabled placeholder="No parameters required" className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-400 w-full mb-3" />;
        return queryParams.map((param: any) =>
          renderInput(param.name, param.name, formValues.queryParams[param.name] || param.example || "", "Params", param.required, param.description)
        );

      case "Headers":
        let headers = endpointData.headers || [];
        if (api?.providerAuthLocation === "header" && api?.providerAuthField) {
          headers = headers.filter((h: any) => h.name !== api.providerAuthField);
        }
        if (!headers.length) return <input type="text" disabled placeholder="No headers required" className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-400 w-full mb-3" />;
        return headers.map((header: any) =>
          renderInput(header.name, header.name, formValues.headers[header.name] || header.value || "", "Headers", header.required, header.description)
        );

      case "Body":
        const bodyParams = endpointData.bodyParameters || [];
        if (!bodyParams.length) return <textarea disabled placeholder="No body required" rows={5} className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-400 w-full mb-3 resize-none" />;
        return (
          <textarea
            value={JSON.stringify(formValues.bodyParams || {}, null, 2)}
            onChange={(e) => {
              try { const parsed = JSON.parse(e.target.value); setFormValues((prev) => ({ ...prev, bodyParams: parsed })); } catch {}
            }}
            placeholder='Enter JSON body, e.g. {"key": "value"}'
            rows={8}
            className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary w-full mb-3 resize-none"
          />
        );

      default:
        return null;
    }
  };

  // ✅ Test endpoint
  const handleTesting = async () => {
    if (!endpointData) return;

    const res = await dispatch(
      testEndpoint({
        apiId,
        endpointId: endpointData.id,
        payload: formValues,
        headers: api?.requiresApiKey ? { "x-api-key": apiKeyData?.apiKey } : {},
      })
    );
  };

  return (
    <div className="border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md">
      {/* Section Tabs */}
      <div className="flex gap-2 md:gap-4 bg-gray-200 dark:bg-[#191819] px-4 py-2 rounded-md mb-4">
        {["APIKey", "Params", "Headers", "Body"].map((section) => (
          <button
            key={section}
            onClick={() => setFormSection(section)}
            className={`px-3 py-1 rounded-md text-sm ${formSection === section ? "bg-primary text-white" : "text-gray-700 dark:text-gray-300"}`}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Render section */}
      {renderFormSection()}

      {/* Action Buttons */}
      <div className="flex gap-4 mt-4">
        {subscriptionData?.isOwner ? (
          <Button onClick={handleTesting}>Test (owner)</Button>
        ) : api?.requiresApiKey ? (
          subscriptionData?.isSubscribed ? (
            <>
              <Button onClick={handleTesting}>Test Endpoint</Button>
              <Button variant="outline" disabled>
                API Key: {apiKeyData?.apiKey || "N/A"}
              </Button>
            </>
          ) : (
            <>
              <Link to={`/subscription_details/${apiId}`}>
                <Button>Subscribe to Test</Button>
              </Link>
              <Button variant="outline" disabled title="Subscribe first">
                Get API Key
              </Button>
            </>
          )
        ) : (
          <Button onClick={handleTesting}>Test Endpoint</Button>
        )}
      </div>
    </div>
  );
};

export default EndpointInputForm;
