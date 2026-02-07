"use client";

import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const DEBOUNCE_MS = 300;
const MIN_QUERY_LENGTH = 3;
const SEARCH_LIMIT = 5;
const ZOOM_ON_SELECT = 15;

export default function SearchBox() {
  const map = useMap();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query.length < MIN_QUERY_LENGTH) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timeout = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `${NOMINATIM_URL}?q=${encodeURIComponent(query)}&format=json&limit=${SEARCH_LIMIT}`
        );
        const data = (await res.json()) as SearchResult[];
        setResults(data ?? []);
        setShowDropdown(true);
      } catch {
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [query]);

  const selectLocation = (item: SearchResult) => {
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);
    map.setView([lat, lon], ZOOM_ON_SELECT);
    setQuery(item.display_name);
    setShowDropdown(false);
  };

  return (
    <div className="absolute top-3 right-3 left-3 sm:left-auto sm:w-80 z-[1000]">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 dark:text-gray-500 pointer-events-none" strokeWidth={1.5} />
        <input
          type="text"
          value={query}
          placeholder="Search address or place…"
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          aria-label="Search location"
          aria-autocomplete="list"
          aria-expanded={showDropdown && results.length > 0}
        />
        {showDropdown && results.length > 0 && (
          <ul
            className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden z-10 max-h-60 overflow-y-auto"
            role="listbox"
          >
            {results.map((item, idx) => (
              <li key={`${item.lat}-${item.lon}-${idx}`} role="option">
                <button
                  type="button"
                  onClick={() => selectLocation(item)}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 border-b border-gray-100 dark:border-neutral-800 last:border-0 transition-colors"
                >
                  {item.display_name}
                </button>
              </li>
            ))}
          </ul>
        )}
        {isSearching && query.length >= MIN_QUERY_LENGTH && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-caption text-gray-400" aria-hidden>
            Searching…
          </span>
        )}
      </div>
    </div>
  );
}
