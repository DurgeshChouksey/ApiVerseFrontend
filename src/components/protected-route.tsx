import { type ReactNode } from "react";
import { useGetUserProfileQuery } from "@/features/user/userApi";
import NotFound from "./NotFound";
import Loading from "@/pages/Loading";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Call RTK Query to check auth
  const { data: userInfo, isLoading, error } = useGetUserProfileQuery(undefined);

  if (isLoading) {
    // While query is loading, show loader
    return <Loading />;
  }

  if (error || !userInfo?.user) {
    // If API fails or user not authenticated, show NotFound or redirect
    return <NotFound />;
  }

  // User authenticated → render the protected page
  return <>{children}</>;
};

export default ProtectedRoute;
