import type { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NotFound from './NotFound';
import { use } from 'react';

const ProtectedRoute = ({children} : any) => {

    const userInfo : any = useSelector<RootState>(state => state.user);

    let isAuthenticated = false;

    if(userInfo.user) isAuthenticated = true;


  return (
    <>{isAuthenticated ? children : <NotFound/>}</>
  )
}

export default ProtectedRoute;
