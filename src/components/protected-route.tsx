import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import NotFound from "./NotFound";
import Loading from "@/pages/Loading";

const ProtectedRoute = ({ children }: any) => {
	const { user, loading } = useSelector((state: RootState) => state.user);

	if (loading) {
		// While checking auth → show loader instead of NotFound
		return <Loading />;
	}

	if (!user) {
		// Auth check complete → user not found
		return <NotFound />;
	}

	// User authenticated → render the page
	return <>{children}</>;
};

export default ProtectedRoute;
