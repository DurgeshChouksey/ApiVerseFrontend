import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { ChartNetwork, Gauge, Heart, Ban } from "lucide-react";
import { useState } from 'react';



export default function Card({apiId,category, lastUpdate, name, description, ownerName, totalCalls, totalErrors, averageLatency, isBookmarked}) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  async function handleBookmark() {
    if (bookmarked == false) {
      await fetchWithAuth(`/api/v1/apis/${apiId}/bookmark`, { method: 'POST' });
      setBookmarked(true);
    } else {
      await fetchWithAuth(`/api/v1/apis/${apiId}/bookmark`, { method: 'DELETE' });
      setBookmarked(false);
    }
  }

  return (
    <article className="bg-background flex w-full rounded-md flex-col items-start border-2 border-black p-6 dark:border-white hover:border-primary hover:dark:border-primary">
      <div className="mb-2 w-full flex items-center justify-between gap-x-2 text-xs">
        <div className="text-white  border-black bg-red-500 px-3 py-1 font-bold dark:border-white rounded-md">
          {category}
        </div>
        <button onClick={handleBookmark} aria-label="Bookmark API" className="text-2xl leading-none">
          <Heart color={bookmarked ? 'red' : '#9ca3af'} />
        </button>
      </div>
      <div className="group relative">
        <h3 className="group-hover:text-red-5-0 text-foreground mt-3 text-xl leading-6 font-black uppercase">
          <a href="#">
            {name}
          </a>
        </h3>
        <p className="text-md mt-5 border-l-4 border-red-500 pl-4 leading-6 text-gray-800 dark:text-gray-300">
          {description}
        </p>
      </div>
      {/* user info and last updated section */}
      <div className="mt-3 flex items-center justify-between w-full">
          <div>
            By {ownerName}
          </div>
          <div>
            {lastUpdate}
          </div>
      </div>

      {/* API log statistics section */}
      <div className="mt-6 w-full flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-x-1">
          <span role="img" aria-label="calls"><ChartNetwork size={18}/></span>
          <span>{totalCalls?.toLocaleString?.() ?? totalCalls ?? 0} calls</span>
        </div>
        <div className="flex items-center gap-x-1">
          <span role="img" aria-label="errors"><Ban size={18}/></span>
          <span>{totalErrors?.toLocaleString?.() ?? totalErrors ?? 0} errors</span>
        </div>
        <div className="flex items-center gap-x-1">
          <span role="img" aria-label="latency"><Gauge size={18}/></span>
          <span>
            {typeof averageLatency === "number"
              ? `${averageLatency.toFixed(1)} ms`
              : averageLatency ?? "0 ms"}
          </span>
        </div>
      </div>
    </article>
  );
}
