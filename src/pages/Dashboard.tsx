import Card from '@/components/card';
import Navbar from '@/components/navbar';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { useEffect, useState } from 'react';


const Dashboard = () => {

  const [user, setUser] = useState("");
  const [publicApis, setPublicApis] = useState([]);

  async function checkAuth() {
    const res = await fetchWithAuth('/api/v1/auth/check-auth', {
      method: 'POST',
    });
    setUser(res.user);
  }

  async function getPublicApi() {
    const res = await fetchWithAuth('/api/v1/apis');
    setPublicApis(res.apis);
  }

  useEffect(() => {
    checkAuth();
    getPublicApi();
  }, []);


  if(user) console.log(user);
  if(publicApis.length > 0) console.log(publicApis);

  function redableDate(updatedAt: string) : string {
    const timestamp = updatedAt;
    const date = new Date(timestamp);
    const readable = date.toLocaleDateString('en-GB');
    return readable;
  }


  return (
    <div>
      <div className='wrapper max-w-7xl px-4 mx-auto mt-30 md:mt-20'>
        <Navbar isLoggedIn={true} currentPage='dashboard' ></Navbar>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {publicApis.length > 0 && publicApis.map((api) => (
            <Card key={api?.id} name={api?.name} description={api?.description} ownerName={api?.owner?.username} category={api?.category} lastUpdate={redableDate(api.updatedAt)}  totalCalls={api?.apiLogs[0]?.totalCalls} totalErrors={api?.apiLogs[0]?.totalErrors} averageLatency={api?.apiLogs[0]?.averageLatency} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
