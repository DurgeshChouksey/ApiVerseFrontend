import React, { useState } from "react";

const MEDIA_TYPES = [
  "application/json",
  "application/x-www-form-urlencoded",
  "form-data",
  "plain-text",
];

const BodyFormData: React.FC = () => {
  const [mediaType, setMediaType] = useState(MEDIA_TYPES[0]);
  const [payloadName, setPayloadName] = useState("");
  const [payloadDescription, setPayloadDescription] = useState("");

  return (
    <div className="mt-4 max-w-full w-full">
      {/* Media type label and dropdown */}
      <label className="block mb-1 text-sm font-medium text-foreground">
        Media type
      </label>
      <select
        value={mediaType}
        onChange={(e) => setMediaType(e.target.value)}
        className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground"
      >
        {MEDIA_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {/* Payload Name input */}
      <input
        type="text"
        placeholder="payload name"
        value={payloadName}
        onChange={(e) => setPayloadName(e.target.value)}
        className="w-full mt-3 px-3 py-2 rounded-md border border-border bg-background text-foreground"
      />

      {/* Payload Description textarea */}
      <textarea
        placeholder="payload description"
        value={payloadDescription}
        onChange={(e) => setPayloadDescription(e.target.value)}
        rows={3}
        className="w-full mt-3 px-3 py-2 rounded-md border border-border bg-background text-foreground resize-y"
      />
    </div>
  );
};

export default BodyFormData;
