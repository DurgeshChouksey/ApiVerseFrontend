// src/components/add-endpoint-form.tsx

import React, { useMemo, useState } from "react";

type AddEndpointFormProps = {
  onCancel?: () => void;
  onSubmit?: (data: {
    name: string;
    description: string;
    method: string;
    path: string;
  }) => void;
  // ADDED: A prop to receive the data of the endpoint being edited
  initialData?: {
    name: string;
    description: string;
    method: string;
    path: string;
  } | null;
};

const HTTP_METHODS = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
];

const AddEndpointForm: React.FC<AddEndpointFormProps> = ({
  onCancel,
  onSubmit,
  initialData, // ADDED: Destructure the new prop
}) => {
  // ADDED: A boolean to determine if we are in "edit" mode
  const isEditMode = !!initialData;

  // CHANGED: Initialize state with initialData if it exists, otherwise use defaults
  const [activeTab, setActiveTab] = useState("Headers");
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [method, setMethod] = useState(initialData?.method || "GET");
  const [path, setPath] = useState(initialData?.path || "");

  const isValid = useMemo(() => name.trim().length > 0, [name]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    onSubmit?.({
      name: name.trim(),
      description: description.trim(),
      method,
      path: path.trim(),
    });
  }

  return (
    <div className=" rounded-md shadow-sm p-4 md:p-6 flex flex-col h-[calc(100vh-140px)]">
      {/* CHANGED: Conditionally render the title based on edit mode */}
      <h2 className="text-2xl font-semibold text-gray-300 mb-2">
        {isEditMode ? "Edit Endpoint" : "Add Endpoint"}
      </h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm text-foreground mb-1">
            Name<span className="text-red-500"> *</span>
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Endpoint name"
            className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
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
            rows={4}
            className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start">
          <div className="sm:w-[140px] w-full">
            <label className="block text-sm text-foreground mb-1">Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {HTTP_METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm text-foreground mb-1">Path</label>
            <input
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder="Specify the endpoint path relative to the base URL"
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use <code>{"{curly braces}"}</code> to indicate path Query if
              needed. e.g., <code>/employees/{"{id}"}</code>
            </p>
          </div>
        </div>

        <div className="flex gap-6 border-b border-border mt-2">
          {["Headers", "Query", "Body"].map((tab) => (
            <button
              key={tab}
              type="button" // ADDED: type="button" to prevent form submission
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

        <div className="mt-6 flex gap-2 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-2 text-sm rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className={`px-3 py-2 text-sm rounded-md border border-border bg-background transition-colors ${isValid ? "hover:bg-primary/10" : "opacity-50 cursor-not-allowed"}`}
          >
            {/* CHANGED: Conditionally render the button text */}
            {isEditMode ? "Save Changes" : "Save Endpoint"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEndpointForm;