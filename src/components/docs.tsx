import React, { useEffect, useState } from "react";
import DocsEditor from "@/components/docs-editor";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useParams } from "react-router-dom";
import Loading from "@/pages/Loading";

const Docs = () => {
	const { apiId } = useParams();
	const [docs, setDocs] = useState("");
	const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	// Fetch existing docs
	useEffect(() => {
		const fetchDocs = async () => {
			setLoading(true);
			const res = await fetchWithAuth(`/api/v1/apis/${apiId}/docs`);
			setDocs(res.content);
			setLoading(false);
		};
		fetchDocs();
	}, [apiId]);

	// Save docs to backend
	const handleSave = async (content: string) => {
		try {
			const res = await fetchWithAuth(`/api/v1/apis/${apiId}/docs`, {
				method: "POST",
				data: { content },
			});
      setErrorMessage("");
			setSuccessMessage(res?.message);
		} catch (error) {
      setSuccessMessage("");
			setErrorMessage(error?.response?.data?.title);
    }
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="p-6">
			<DocsEditor initialContent={docs} onSave={handleSave} successMessage={successMessage} errorMessage={errorMessage} />
		</div>
	);
};

export default Docs;
