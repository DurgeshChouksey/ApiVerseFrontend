import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Landing from "./pages/Landing";
import { ThemeProvider } from "./components/theme-provider";
import VerifyEmail from "./pages/VerifyEmail";
import Loading from "./pages/Loading";
import PublicApi from "./components/public-api";
import MyApi from "./components/my-api";
import Navbar from "./components/navbar";
import Subscribed from "./components/subscribed";
import ProtectedRoute from "./components/protected-route";
import NotFound from "./components/NotFound";
import { checkAuth } from "./features/user/userSlice";
import { type RootState, type AppDispatch } from "@/redux/store";
import Workspace from "./pages/Workspace";
import AboutUs from "./pages/About";
import Bookmark from "./pages/Bookmark";

function App() {

	const dispatch = useDispatch<AppDispatch>();
  const userInfo : any = useSelector<RootState>(state => state.user);
  let isLoggedIn = !!userInfo?.user;

	useEffect(async () => {
		const res = await dispatch(checkAuth());
		console.log(res);
	}, [dispatch]);


  // route list
	const routeList = [
		{ path: "/loading", element: <Loading /> },
		{ path: "/", element: <Landing /> },
		{ path: "/signup", element: <Signup /> },
		{ path: "/verify-email", element: <VerifyEmail /> },
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
