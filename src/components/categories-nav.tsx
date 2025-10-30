import { useGetPublicApisQuery } from '@/features/apis/apisApi';
import Loading from '@/pages/Loading';
import { Layers } from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CategoriesNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data, isLoading } = useGetPublicApisQuery({ limit: 100 });

  if (isLoading) {
    return <Loading />;
  }

  const categories = data?.apis
    ? Array.from(new Set(data.apis.map((api: any) => api.category)))
    : [];

  return (
      <div className="mt-2 pt-4 border-t-2 border-gray-300 dark:border-gray-800">
      {!pathname.startsWith('/playground') && (
        <div className="py-4">
          <div className="flex items-center gap-2 px-4 mb-2 text-gray-700 dark:text-gray-200">
            <Layers className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Categories
            </h2>
          </div>
          <ul className="space-y-1">
            {categories.map((category, idx) => (
              <li
                key={idx}
                onClick={() => navigate(`/category/${category}`)}
                className="cursor-pointer px-4 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-md hover:bg-primary hover:text-white transition-colors duration-200"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoriesNav;
