import EndpointInputForm from "@/components/endpoint-input-form";
import Response from "@/components/endpoint-response";
import Endpoints from "@/components/endpoints";
import Sidebar from "@/components/sidebar";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGetEndpointsQuery } from "@/features/endpoints/endpointsApi";

const ApiPlayground = () => {
  const { pathname } = useLocation();
  const { apiId, endpointId }: any = useParams();
  const [endpointData, setEndpointData] = useState<any>(null);

  // Fetch endpoints using RTK Query
  const { data: endpoints } = useGetEndpointsQuery({ apiId });

  // Fetch the selected endpoint from the query result
  useEffect(() => {
    if (endpoints && endpointId) {
      const endpoint = endpoints.find((ep: any) => ep.id === endpointId);
      if (endpoint) setEndpointData(endpoint);
    }
  }, [endpointId, endpoints]);

  return (
    <div className="md:mt-10">
      {/* left */}
      <Sidebar />

      {/* right */}
      <div className="md:ml-[250px] p-6 mt-15">
        {/* showing endpoints on mobile view */}
        <div className="md:hidden">
          <Endpoints apiId={apiId} pathname={pathname} />
        </div>

        {/* Endpoint inputs section */}
        <EndpointInputForm apiId={apiId} endpointData={endpointData} />

        {/* Response section */}
        <Response />
      </div>
    </div>
  );
};

export default ApiPlayground;
