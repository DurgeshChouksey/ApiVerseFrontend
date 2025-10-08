import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { Heart } from "lucide-react";
import { useState } from 'react';

export default function Card({category, lastUpdate, name, description, ownerName, totalCalls, totalErrors, averageLatency}) {
  const [bookmarked, setBookmarked] = useState(false);

  async function handleBookmark() {
    if (!bookmarked) {
      await fetchWithAuth('/api/v1/apis/add-bookmark', { method: 'POST' });
    } else {
      await fetchWithAuth('/api/v1/apis/delete-bookmark', { method: 'POST' });
    }
    setBookmarked(!bookmarked);
  }

  return (
    <article className="bg-background flex w-full max-w-[400px] flex-col items-start justify-between border-4 border-black p-6 shadow-[8px_8px_0_0_#000] transition-shadow duration-300 hover:shadow-[12px_12px_0_0_#000] dark:border-white dark:shadow-[8px_8px_0_0_#fff] dark:hover:shadow-[12px_12px_0_0_#fff]">
      <div className="mb-2 w-full flex items-center justify-between gap-x-2 text-xs">
        <div className="text-foreground border-2 border-black bg-red-500 px-3 py-1 font-bold dark:border-white">
          {category}
        </div>
        <button onClick={handleBookmark} aria-label="Bookmark API" className="text-2xl leading-none">
          <Heart color={bookmarked ? 'red' : undefined} />
        </button>
      </div>
      <div className="group relative">
        <h3 className="group-hover:text-red-5-0 text-foreground mt-3 text-2xl leading-6 font-black uppercase">
          <a href="#">
            {name}
          </a>
        </h3>
        <p className="text-md mt-5 border-l-4 border-red-500 pl-4 leading-6 text-gray-800 dark:text-gray-100">
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
      <div className="mt-4 w-full flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-x-1">
          <span role="img" aria-label="calls">📞</span>
          <span>{totalCalls?.toLocaleString?.() ?? totalCalls ?? 0} calls</span>
        </div>
        <div className="flex items-center gap-x-1">
          <span role="img" aria-label="errors">❌</span>
          <span>{totalErrors?.toLocaleString?.() ?? totalErrors ?? 0} errors</span>
        </div>
        <div className="flex items-center gap-x-1">
          <span role="img" aria-label="latency">⚡</span>
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
