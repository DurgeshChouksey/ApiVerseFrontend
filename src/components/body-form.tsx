import React, { useEffect, useState } from "react";

const MEDIA_TYPES = [
  "application/json",
  "application/x-www-form-urlencoded",
  "form-data",
  "plain-text",
];

const FIELD_TYPES = ["string", "number", "boolean", "Array", "Object"];

interface Field {
  name: string;
  type: string;
  defaultValue: string;
  required: boolean;
}

interface BodyFormDataProps {
  value: {
    mediaType: string;
    payloadName: string;
    payloadDescription: string;
    bodyContent: string;
    fields: Field[];
  };
  onChange: (value: BodyFormDataProps["value"]) => void;
}

const BodyFormData: React.FC<BodyFormDataProps> = ({ value, onChange }) => {
  const { mediaType, payloadName, payloadDescription, bodyContent, fields } = value;

  // --- Handlers ---
  const update = (changes: Partial<BodyFormDataProps["value"]>) => {
    onChange({ ...value, ...changes });
  };

  const handleFieldChange = (index: number, key: keyof Field, val: string | boolean) => {
    const updated = [...fields];
    updated[index][key] = val as never;

    if (key === "name" && index === fields.length - 1 && val !== "") {
      updated.push({ name: "", type: "string", defaultValue: "", required: false });
    }

    update({ fields: updated });
  };

  const handleDelete = (index: number) => {
    const updated = fields.filter((_, i) => i !== index);
    update({
      fields: updated.length
        ? updated
        : [{ name: "", type: "string", defaultValue: "", required: false }],
    });
  };

  return (
    <div className="mt-4 max-w-full w-full">
      {/* Media type */}
      <div className="flex gap-2">
        <label className="block mb-1 pt-2 text-sm font-medium text-foreground">
          Media type
        </label>
        <select
          value={mediaType}
          onChange={(e) => update({ mediaType: e.target.value })}
          className="w-[30%] px-3 py-2 rounded-md border border-border bg-background text-foreground"
        >
          {MEDIA_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Payload name */}
      <input
        type="text"
        placeholder="payload name"
        value={payloadName}
        onChange={(e) => update({ payloadName: e.target.value })}
        className="w-[40%] mt-3 px-3 py-2 rounded-md border border-border bg-background text-foreground"
      />

      {/* Payload description */}
      <textarea
        placeholder="payload description"
        value={payloadDescription}
        onChange={(e) => update({ payloadDescription: e.target.value })}
        rows={3}
        className="w-full mt-3 px-3 py-2 rounded-md border border-border bg-background text-foreground resize-y"
      />

      {/* Always show Body label */}
      <label className="block mb-2 mt-4 text-sm font-medium text-foreground">
        Body <span className="text-red-500">*</span>
      </label>

      {mediaType === "form-data" ? (
        <div className="overflow-x-auto mt-2">
          <table className="min-w-full border border-border rounded-md">
            <thead className="bg-muted/20">
              <tr>
                <th className="text-left px-6 py-2 text-sm font-medium min-w-[120px]">Name *</th>
                <th className="text-left px-6 py-2 text-sm font-medium min-w-[100px]">Type</th>
                <th className="text-left px-6 py-2 text-sm font-medium min-w-[160px]">Default Example Value</th>
                <th className="text-left px-6 py-2 text-sm font-medium min-w-[100px]">Required</th>
                <th className="text-left px-6 py-2 text-sm font-medium min-w-[120px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((f, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-3 py-2">
                    <input
                      value={f.name}
                      onChange={(e) => handleFieldChange(i, "name", e.target.value)}
                      className="w-full px-2 py-1 border border-border rounded-md"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <select
                      value={f.type}
                      onChange={(e) => handleFieldChange(i, "type", e.target.value)}
                      className="w-full px-2 py-1 border border-border rounded-md"
                    >
                      {FIELD_TYPES.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <input
                      value={f.defaultValue}
                      onChange={(e) => handleFieldChange(i, "defaultValue", e.target.value)}
                      className="w-full px-2 py-1 border border-border rounded-md"
                    />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={f.required}
                      onChange={(e) => handleFieldChange(i, "required", e.target.checked)}
                    />
                  </td>
                  <td className="px-7 py-2">
                    <button
                      type="button"
                      onClick={() => handleDelete(i)}
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
      ) : (
        <textarea
          placeholder="Enter body content"
          value={bodyContent}
          onChange={(e) => update({ bodyContent: e.target.value })}
          rows={5}
          className="w-full mt-3 px-3 py-2 rounded-md border border-border bg-background text-foreground resize-y"
        />
      )}
    </div>
  );
};

export default BodyFormData;
