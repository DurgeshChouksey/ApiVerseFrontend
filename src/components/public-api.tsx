import Card from '@/components/card';
import Sidebar from '@/components/sidebar';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { publicApis } from '@/features/apis/apiSlice';
import { redableDate } from '@/lib/redableDates';

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

  // Calculate top categories
  const categoryCounts = publicApi.reduce((acc, api) => {
    if (api.category) {
      acc[api.category] = (acc[api.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([category]) => category);


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
            <h1 className='mt-10 text-3xl font-poppins'>TOP CATEGORIES</h1>
            <div className='mt-5 flex gap-6'>
              {topCategories.map((category) => (
                <div key={category} className='border-2 border-black dark:border-white  rounded-md flex flex-col items-start p-4 gap-2 hover:border-primary hover:dark:border-primary'>

                  <div className='font-semibold text-lg'>{category}</div>
                  <div className='text-sm text-gray-600'>
                    APIs offer tools for developers to bolster the security of their applications and systems...
                  </div>
                  <button className='mt-2 text-sm px-3 py-1 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white rounded transition duration-700'>
                    Browse Category
                  </button>
                </div>
              ))}
            </div>

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
