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
import Subscribed from './components/Subscribed'
import ProtectedRoute from './components/protected-route'
import NotFound from './components/NotFound'



function App() {

  const pathname = window.location.pathname;


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
          <Navbar isLoggedIn={true} currentPage={pathname}/>
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
