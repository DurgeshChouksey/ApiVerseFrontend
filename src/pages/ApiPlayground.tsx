import EndpointInputForm from "@/components/endpoint-input-form";
import Response from "@/components/endpoint-response";
import Sidebar from "@/components/sidebar";
import type { RootState } from "@/redux/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ApiPlayground = () => {
  const { apiId, endpointId } : any = useParams();
  const [endpointData, setEndpointData] = useState<any>(null);

  const endpoints = useSelector(
    (state: RootState) => state.endpoints.data
  ) as any[];

  // Fetch endpoint from redux data
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
      <div className="md:ml-[250px] p-6">
        {/* Endpoint inputs section */}
        <EndpointInputForm apiId={apiId} endpointData={endpointData} />

        {/* Response section */}
        <Response  />
      </div>
    </div>
  );
};

export default ApiPlayground;
