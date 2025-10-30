import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Landing from "./pages/Landing";
import { ThemeProvider } from "./components/theme-provider";
import VerifyEmail from "./pages/VerifyEmail";
import Loading from "./pages/Loading";
import PublicApi from "./components/public-api";
import Navbar from "./components/navbar";
import ProtectedRoute from "./components/protected-route";
import NotFound from "./components/NotFound";
import Workspace from "./pages/Workspace";
import AboutUs from "./pages/About";
import Bookmark from "./pages/Bookmark";
import Studio from "./pages/studio";
import ApiPlayground from "./pages/ApiPlayground";
import SubscriptionDetails from "../src/pages/SubscriptionDetails";
import UpdateApi from "./pages/UpdateApi";
import Profile from "./pages/Profile";
import ApiOverview from "./pages/ApiOverview";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { useGetUserProfileQuery } from './features/user/userApi';
import Category from "./pages/Category";

function App() {


  const { data: userInfo, isLoading } = useGetUserProfileQuery(undefined);

  const isLoggedIn = !!userInfo?.user;

  if (isLoading) return <Loading />;

  // route list
	const routeList = [
		{ path: "/loading", element: <Loading /> },
		{ path: "/", element: <Landing /> },
		{ path: "/signup", element: <Signup /> },
		{ path: "/verify-email", element: <VerifyEmail /> },
		{ path: "/forgot-password", element: <ForgotPassword /> },
		{ path: "/resetPassword", element: <ResetPassword /> },
		{path: "/about", element: <AboutUs/>},
		{path: "/bookmarks", element: <Bookmark/>},
		{ path: "/signin", element: <SignIn /> },
		{
			path: "/public",
			element: (
				<ProtectedRoute>
					<PublicApi />
				</ProtectedRoute>
			),
		},
		{
			path: "/workspace",
			element: (
				<ProtectedRoute>
					<Workspace />
				</ProtectedRoute>
			),
		},
		{
			path: "/studio",
			element: (
				<ProtectedRoute>
					<Studio />
				</ProtectedRoute>
			),
		},
		{
			path: "/playground/:apiId",
			element: (
				<ProtectedRoute>
					<ApiPlayground />
				</ProtectedRoute>
			),
		},
		{
			path: "/playground/:apiId/:endpointId/test",
			element: (
				<ProtectedRoute>
					<ApiPlayground />
				</ProtectedRoute>
			),
		},
		{
			path: "/subscription_details/:apiId",
			element: (
				<ProtectedRoute>
					<SubscriptionDetails />
				</ProtectedRoute>
			),
		},
		{
			path: "/studio/:apiId/*",
			element: (
				<ProtectedRoute>
					<UpdateApi></UpdateApi>
				</ProtectedRoute>
			)
		},
		{
			path: "/profile",
			element: (
				<ProtectedRoute>
					<Profile />
				</ProtectedRoute>
			)
		},
		{
			path: "/api-overview/:apiId",
			element: (
				<ProtectedRoute>
					<ApiOverview />
				</ProtectedRoute>
			)
		},
		{
			path: "/category/:categoryName",
			element: (
				<ProtectedRoute>
					<Category />
				</ProtectedRoute>
			)
		},
	];

	return (
		<>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<Navbar isLoggedIn={isLoggedIn} />
				<Routes>
					{routeList.map((route, index) => {
						return (
							<Route key={index} path={route.path} element={route.element} />
						);
					})}
					<Route path={"*"} element={<NotFound />}></Route>
				</Routes>
			</ThemeProvider>
		</>
	);
}

export default App;
