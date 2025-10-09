import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {

    const navigate = useNavigate();

    const isAuthenticated = true;

    useEffect(() => {
        if(!isAuthenticated) navigate('/signin')
    }, [])


  return (
    children
  )
}

export default ProtectedRoute;
