import Card from '@/components/card';
import Sidebar from '@/components/sidebar';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { publicApis } from '@/features/apis/apiSlice';
import { redableDate } from '@/lib/redableDates';
import TopCategories from './top-categories';

const PublicApi = () => {

  const dispatch = useDispatch<AppDispatch>();


  // to fetch public api
  const [publicApi, setPublicApi] = useState([]);

  async function fetchPublicApis() {
    const {payload} = await dispatch(publicApis());
    setPublicApi(payload.apis);
  }

  useEffect(() => {
    fetchPublicApis();
  }, []);




  return (
    <div>
      <div className='mt-30 md:mt-10'>

        <div>
          {/* left */}
          <Sidebar />

          {/* right */}
          <div className='md:ml-[200px] p-6'>

            {/* <div className='font-poppins mt-4 flex flex-col items-center sm:flex-row w-full gap-5 py-5'>
              <div className='stats-div'>Developers</div>
              <div className='stats-div'>Calls</div>
              <div className='stats-div'>Activites</div>
              <div className='stats-div'>Active users</div>
            </div> */}


            {/* top categories */}
              <TopCategories publicApi={publicApi} />

            <h1 className='mt-10 text-3xl font-poppins'>PUBLIC API'S</h1>
            <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6'>
              {publicApi.length > 0 && publicApi.map((api) => (
                <Card
                  key={api?.id}
                  name={api?.name}
                  description={api?.description}
                  ownerName={api?.owner?.username}
                  category={api?.category}
                  lastUpdate={redableDate(api.updatedAt)}
                  totalCalls={api?.apiLogs[0]?.totalCalls}
                  totalErrors={api?.apiLogs[0]?.totalErrors}
                  averageLatency={api?.apiLogs[0]?.averageLatency}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PublicApi;
