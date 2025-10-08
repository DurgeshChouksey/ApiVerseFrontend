import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

const PublicApi = () => {
  return (
    <div className="flex max-w-7xl px-4 mx-auto mt-30 md:mt-20">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar isLoggedIn={true} currentPage="public" />
        <h1 className="text-xl font-bold mt-4">Public APIs</h1>
      </div>
    </div>
  );
};

export default PublicApi;
