import Card from '@/components/card';
import Sidebar from '@/components/sidebar';
import { myApis } from '@/features/apis/apiSlice';
import { redableDate } from '@/lib/redableDates';
import type { AppDispatch } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


const PublicApi = () => {

  const [myApi, setMyApi] = useState([]);

  const dispatch = useDispatch<AppDispatch>();

  async function fetchMyApi() {
    const {payload} = await dispatch(myApis());
    setMyApi(payload.apis);
  }

  useEffect(() => {
    fetchMyApi();
  }, []);

  return (
    <div>
      <div className='mt-30 md:mt-12'>
        <div>
          <Sidebar />
          <div className='md:ml-[18%] p-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6'>
              {myApi.length > 0 && myApi.map((api) => (
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
