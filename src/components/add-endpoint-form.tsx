import React, { useMemo, useState } from "react";
import BodyFormData from "./body-form";

type Field = {
  name: string;
  type: string;
  defaultValue: string;
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
    name: string;
    description: string;
    method: string;
    path: string;
  } | null;
};

// --- Table Component for Headers/Query ---
const FieldTable: React.FC<{
  fields: Field[];
  onChange: (fields: Field[]) => void;
}> = ({ fields, onChange }) => {
  const handleFieldChange = (index: number, key: keyof Field, value: any) => {
    const updated = [...fields];
    updated[index][key] = value;

    // Add new empty row when typing in last row name
    if (key === "name" && index === fields.length - 1 && value.trim() !== "") {
      updated.push({
        name: "",
        type: "string",
        defaultValue: "",
        required: false,
      });
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
        defaultValue: "",
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
        defaultValue: "",
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
              Default Example Value
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
                  value={field.defaultValue}
                  onChange={(e) =>
                    handleFieldChange(index, "defaultValue", e.target.value)
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
  onSubmit,
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
    { name: "", type: "string", defaultValue: "", required: false },
  ]);
  const [queryFields, setQueryFields] = useState<Field[]>([
    { name: "", type: "string", defaultValue: "", required: false },
  ]);
  const [bodyData, setBodyData] = useState({
    mediaType: "application/json",
    payloadName: "",
    payloadDescription: "",
    bodyContent: "",
    fields: [{ name: "", type: "string", defaultValue: "", required: false }],
  });

  const isValid = useMemo(() => name.trim().length > 0, [name]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    const headers = headersFields.filter((f) => f.name.trim() !== "");
    const queryParams = queryFields.filter((f) => f.name.trim() !== "");
    const bodyParams =
      bodyData.mediaType === "form-data"
          ? bodyData.fields.filter((f) => f.name.trim() !== "")
          : bodyData.bodyContent
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
    onSubmit?.(endpointDetails);
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

        {/* --- Buttons --- */}
        <div className="mt-6 flex gap-2 justify-end">
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
              isValid ? "hover:bg-primary/10" : "opacity-50 cursor-not-allowed"
            }`}
          >
            {isEditMode ? "Save Changes" : "Save Endpoint"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEndpointForm;
