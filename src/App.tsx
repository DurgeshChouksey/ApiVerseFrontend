import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'
import Landing from './pages/Landing'
import { ThemeProvider } from './components/theme-provider'
import VerifyEmail from './pages/VerifyEmail'
import Loading from './pages/Loading'
import PublicApi from './components/public-api'
import MyApi from './components/my-api'
import Navbar from './components/navbar'
import Subscribed from './components/subscribed'
import ProtectedRoute from './components/protected-route'
import NotFound from './components/NotFound'
import { checkAuth } from './features/user/userSlice'
import type { AppDispatch } from '@/redux/store';



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // to check auth on every refresh
  const dispatch = useDispatch<AppDispatch>();

  async function fetchUser() {
    const {payload} = await dispatch(checkAuth());
    console.log(payload)
    if(payload?.user) setIsLoggedIn(true);
  }

  useEffect(() => {
    fetchUser();
  }, []);


  const routeList = [
    {path:"/loading", element: <Loading/>},
    {path: "/", element: <Landing/>},
    {path: "/signup", element:<Signup/>},
    {path: "/verify-email", element: <VerifyEmail /> },
    {path: "/signin", element: <SignIn />},
    {path: "/public", element: <ProtectedRoute><PublicApi/></ProtectedRoute>},
    {path: "/myapi", element: <ProtectedRoute><MyApi/></ProtectedRoute>},
    {path: "/subscribed", element: <ProtectedRoute><Subscribed/></ProtectedRoute>}
  ]

  return (
    <>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <BrowserRouter>
          <Navbar isLoggedIn={isLoggedIn} />
          <Routes>
            {
              routeList.map((route, index) => {
                return <Route key={index} path={route.path} element={route.element} />;
              })
            }

            <Route path={"*"} element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
        </ThemeProvider>
    </>
  )
}

export default App
