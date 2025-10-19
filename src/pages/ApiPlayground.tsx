import EndpointInputForm from "@/components/endpoint-input-form";
import Response from "@/components/endpoint-response";
import Endpoints from "@/components/endpoints";
import Sidebar from "@/components/sidebar";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGetEndpointsQuery, useTestEndpointMutation } from "@/features/endpoints/endpointsApi";

const ApiPlayground = () => {
	const { pathname } = useLocation();
	const { apiId, endpointId }: any = useParams();
	const [endpointData, setEndpointData] = useState<any>(null);

	const { data: endpoints, isLoading, error } = useGetEndpointsQuery({ apiId });

	useEffect(() => {
    if (endpoints && endpointId) {
      const endpoint = endpoints.find((ep: any) => ep.id === endpointId);
			if (endpoint) setEndpointData(endpoint);
		}
	}, [endpointId, endpoints]);

  const [testEndpoint, { data: testResponse, isLoading: testLoading, error: testError }] = useTestEndpointMutation();

	if (isLoading) return <p>Loading endpoints...</p>;
	if (error) return <p>Error loading endpoints</p>;


	return (
		<div className="md:mt-10">
			{/* left */}
			<Sidebar />

			{/* right */}
			<div className="md:ml-[250px] p-6 mt-15">
				{/* showing endpoints on mobile view */}
				<div className="md:hidden">
					<Endpoints apiId={apiId} pathname={pathname}></Endpoints>
				</div>

				{/* Endpoint inputs section */}
				<EndpointInputForm
          apiId={apiId}
          endpointData={endpointData}
        />

				{/* Response section */}
				<Response />
			</div>
		</div>
	);
};

export default ApiPlayground;
