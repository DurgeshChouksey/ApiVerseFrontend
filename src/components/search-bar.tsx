import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from '@/features/search/searchSlice';
import { Search, Command } from "lucide-react";
import type { AppDispatch } from "@/redux/store";

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState("");
  const desktopRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);

  // 🔹 Debounce filter update
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setFilter(query));
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  // 🔹 Command + K (or Ctrl + K) focus
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (window.innerWidth < 768) {
          mobileRef.current?.focus();
        } else {
          desktopRef.current?.focus();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* 🔹 Desktop SearchBar */}
      <div className="hidden md:flex items-center rounded-md border border-gray-300 px-3 py-1 w-[250px] lg:w-[300px]">
        <Search />
        <input
          ref={desktopRef}
          type="text"
          value={query}
          placeholder="Search APIs..."
          onChange={(e) => setQuery(e.target.value)}
          className="border-none outline-none w-full px-2 bg-transparent"
        />
        <div className="flex gap-0.5 items-center justify-center">
          <Command className="w-4 h-4" />K
        </div>
      </div>

      {/* 🔹 Mobile SearchBar */}
      <div className="flex md:hidden justify-center mt-16 pb-2 w-full">
        <div className="flex items-center w-[90%] rounded-md border border-gray-300 px-3 py-1 bg-background">
          <Search />
          <input
            ref={mobileRef}
            type="text"
            value={query}
            placeholder="Search APIs..."
            onChange={(e) => setQuery(e.target.value)}
            className="border-none outline-none w-full px-2 bg-transparent"
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(SearchBar);
