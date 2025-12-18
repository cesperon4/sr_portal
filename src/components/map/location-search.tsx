"use client";

import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

type NominatimPlace = {
  place_id: string | number;
  display_name: string;
  lat: string;
  lon: string;
};

type Props = {
  onSelect: (data: { display: string; lat: string; lon: string }) => void;
  value: string;
};

export default function LocationSearch({ onSelect, value }: Props) {
  const [text, setText] = useState<string>("");
  const [results, setResults] = useState<NominatimPlace[]>([]);

  useEffect(() => {
    if (text.length < 3) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(text)}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          setResults([]);
          return;
        }

        const data: NominatimPlace[] = await res.json();
        setResults(data);
      } catch (err) {
        console.log(err);
      }
    };

    const debounce = setTimeout(fetchData, 350); // debounce

    return () => {
      controller.abort();
      clearTimeout(debounce);
    };
  }, [text]);

  return (
    <div className="relative w-full ">
      <div className="flex items-center justify-start gap-1 mb-2">
        <span>{value}</span>
        {value && (
          <div className="hover:bg-gray-100 rounded p-1">
            <IoIosClose size={18} />
          </div>
        )}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search location..."
        className="border border-gray-300 p-2 w-full rounded"
      />

      {results.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow z-50 max-h-60 overflow-y-auto">
          {results.map((place) => (
            <div
              key={place.place_id}
              onClick={() => {
                onSelect({
                  display: place.display_name,
                  lat: place.lat,
                  lon: place.lon,
                });

                setText(place.display_name);
                setResults([]);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {place.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
