import Navbar from '@/components/navbar';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { useEffect, useState } from 'react';


const Dashboard = () => {

  const [user, setUser] = useState("");

  async function checkAuth() {
    console.log("hello")
    const userInfo = await fetchWithAuth('/api/v1/auth/check-auth', {
      method: 'POST',
    });
    setUser(userInfo.user);
  }


  useEffect(() => {
    checkAuth();
  }, []);


  if(user) console.log(user);


  return (
    <div>
      <div className='wrapper max-w-7xl px-4 mx-auto mt-30 md:mt-20'>
        <Navbar isLoggedIn={true} currentPage='dashboard' ></Navbar>
        <div>
          {/* write new code here */}

          <h1>{user?.username}</h1>

        </div>
      </div>
    </div>
  )
}

export default Dashboard;
