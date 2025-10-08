import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'
import { ThemeProvider } from './components/theme-provider'
import VerifyEmail from './pages/VerifyEmail'
import Loading from './pages/Loading'
import PublicApi from './components/PublicApi'
import MyApi from './components/MyApi'
import Subscribed from './components/Subscribed'

function App() {

  const routeList = [
    {path:"/loading", element: <Loading/>},
    {path: "/", element: <Landing/>},
    {path: "/signup", element:<Signup/>},
    {path: "/verify-email", element: <VerifyEmail /> },
    {path: "/signin", element: <SignIn />},
    {path: "/dashboard", element: <Dashboard/>},
    {path: "/public", element: <PublicApi/>},
    {path: "/myapi", element: <MyApi/>},
    {path: "/subscribed", element: <Subscribed/>}
  ]

  return (
    <>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <BrowserRouter>
          <Routes>
            {
              routeList.map((route, index) => {
                return <Route key={index} path={route.path} element={route.element} />;
              })
            }
          </Routes>
        </BrowserRouter>
        </ThemeProvider>
    </>
  )
}

export default App
