import Analytics from '@/components/analytics';
import HubListing from '@/components/hub-listing';
import Settings from '@/components/settings';

import StudioSidebar from '@/components/studio-sidebar';
import { Route, Routes } from 'react-router-dom';

const UpdateApi = () => {
  return (
    <div className="h-screen">
      {/* Sidebar stays fixed */}
      <StudioSidebar />

      {/* Main content changes based on route */}
      <div className="flex-1 overflow-y-auto mt-2 md:mt-16  md:ml-[200px]">

        <Routes>
          <Route path="publish/*" element={<HubListing />} />
          <Route path="analytics/*" element={<Analytics />} />
          <Route path="settings/*" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default UpdateApi
