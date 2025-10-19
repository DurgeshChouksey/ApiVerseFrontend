import JsonView from "@uiw/react-json-view";
import { darkTheme } from "@uiw/react-json-view/dark";
import { lightTheme } from "@uiw/react-json-view/light";
import { useTheme } from "@/components/theme-provider";
import { useTestEndpointMutation } from "@/features/endpoints/endpointsApi";

const Response = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const [, { data, isLoading, error }] = useTestEndpointMutation(); // access mutation result directly

  return (
    <div className="mt-6 border-2 w-[100%] border-gray-300 dark:border-gray-700 rounded-md p-4">
      <h3 className="text-lg font-semibold mb-2">Response</h3>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error occurred</p>}
      {data && (
        <>
          <div className="mb-4">
            <h4 className="font-semibold">Status: {data.status || "Unknown"}</h4>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Data</h4>
            <div className="max-w-[100%] border border-gray-200 dark:border-gray-700 rounded-md p-3 bg-gray-50 dark:bg-[#191819] overflow-auto max-h-[400px]">
              <JsonView value={data.data} style={isDarkMode ? darkTheme : lightTheme} />
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Headers</h4>
            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3 bg-gray-50 dark:bg-[#191819] overflow-auto max-h-[300px]">
              <JsonView value={data.headers} style={isDarkMode ? darkTheme : lightTheme} />
            </div>
          </div>
        </>
      )}
      {!data && !isLoading && !error && <p>No response yet</p>}
    </div>
  );
};

export default Response;
