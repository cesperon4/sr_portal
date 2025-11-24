import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

export default function SearchBox() {
  const map = useMap();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch suggestions as the user types
  useEffect(() => {
    const fetchData = async () => {
      if (query.length < 3) {
        setResults([]);
        return;
      }

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&limit=5`
      );
      const data = (await res.json()) as SearchResult[];
      setResults(data);
      setShowDropdown(true);
    };

    const timeout = setTimeout(fetchData, 300); // debounce
    return () => clearTimeout(timeout);
  }, [query]);

  const selectLocation = (item: SearchResult) => {
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);

    map.setView([lat, lon], 100);

    setQuery(item.display_name);
    setShowDropdown(false);
  };

  return (
    <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}>
      <input
        type="text"
        value={query}
        placeholder="Search address..."
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: 450,
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: 4,
        }}
        className="bg-gray-50"
      />

      {showDropdown && results.length > 0 && (
        <div
          style={{
            position: "absolute",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 4,
            width: "100%",
            marginTop: 2,
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {results.map((item, idx) => (
            <div
              key={idx}
              onClick={() => selectLocation(item)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {item.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
