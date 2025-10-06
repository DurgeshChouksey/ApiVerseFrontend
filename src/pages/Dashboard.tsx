import React, { useEffect } from 'react';
import Navbar from '@/components/navbar';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { fetchWithAuth } from '@/lib/fetchWithAuth';






const Dashboard = () => {


  const userInfo = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => fetchWithAuth('/api/v1/auth/check-auth', {
      method: 'POST'
    }),
  });

  // const publicApi = useQuery({
  //   queryKey: ['publicApis'],
  //   queryFn: () => {

  //   }
  // })

  if(userInfo.isLoading) {
    return <div>loading...</div>
  }

  const user = userInfo?.data?.data?.user;

  return (
    <div>
      <div className='wrapper max-w-7xl px-4 mx-auto mt-30 md:mt-20'>
      <Navbar isLoggedIn={true} currentPage='dashboard' ></Navbar>
        <h1>
          {/* {userInfo?.data?.data?.user?.username} */}
        </h1>
      </div>
    </div>
  )
}

export default Dashboard;
