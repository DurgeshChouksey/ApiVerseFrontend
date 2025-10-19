import React, { useState } from "react";
import DocsEditor from "@/components/docs-editor";
import { useParams } from "react-router-dom";
import Loading from "@/pages/Loading";
import { useGetDocsQuery, useSaveDocsMutation } from "@/features/docs/docsApi";

const Docs = () => {
  const { apiId } = useParams<{ apiId: string }>();
  const { data, isLoading } = useGetDocsQuery(apiId!);
  const [saveDocs, { isLoading: saving }] = useSaveDocsMutation();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = async (content: string) => {
    try {
      const res = await saveDocs({ apiId: apiId!, content }).unwrap();
      setSuccessMessage(res.message);
      setErrorMessage("");
    } catch (err: any) {
      setErrorMessage(err?.data?.title || "Failed to save docs");
      setSuccessMessage("");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <DocsEditor
        initialContent={data?.content || ""}
        onSave={handleSave}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Docs;
