import { useQuery } from "@tanstack/react-query";

interface QueryBuilderProps {
  searchParams: Record<string, string | number> | undefined;
  filterParams?: Record<string, boolean> | undefined;
  base_url: string | undefined;
  orderBy?: string;
  type: "arrest_log" | "weather" | "police_incident";
}

type BuildArrestLogParams = Omit<QueryBuilderProps, "type">;
type BuildOpenWeatherParams = Omit<
  QueryBuilderProps,
  "type" | "orderBy" | "filterParams"
>;

const buildArrestLogsUrl = ({
  searchParams,
  filterParams,
  base_url,
  orderBy,
}: BuildArrestLogParams) => {
  let whereClause = "1=1"; // Default filter (no filter)
  // If searchParams are provided, create the where clause dynamically
  if (searchParams && Object.keys(searchParams).length > 0) {
    whereClause = Object.entries(searchParams)
      .map(([key, value]) => {
        let condition = "";
        if (typeof value === "string") {
          // If the value is a string, use the LIKE operator
          condition = `${key} LIKE '%${value}%'`; // Adding wildcards for LIKE
        } else {
          // Otherwise, use the equality operator
          condition = `${key}=${value}`;
        }
        return condition; // Build the condition
      })
      .join(" AND "); // Join with AND for multiple conditions
  }

  if (filterParams) {
    const activeCodes = Object.entries(filterParams)
      .filter(([, value]) => value)
      .map(([key]) => `statute='${key}'`);

    if (activeCodes.length > 0) {
      const filterClause = activeCodes.join(" OR ");
      whereClause =
        whereClause === "1=1"
          ? filterClause
          : `(${whereClause}) AND (${filterClause})`;
    }
  }

  const params = new URLSearchParams({
    where: whereClause, // Default filter to return all results
    outFields: "*", // Fetch all fields
    outSR: "4326", // Spatial reference
    f: "json", // Response format
    orderByFields: orderBy || "",
    // orderByFields: "DATE_ARRESTED DESC", // Sorting by date_arrested in descending order
    ...searchParams, // Add custom search params
  });

  return `${base_url}?${params.toString()}`;
};

export const buildOpenWeatherUrl = ({
  searchParams,
  base_url,
}: BuildOpenWeatherParams) => {
  if (
    !process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY ||
    !base_url ||
    (!searchParams?.lat && !searchParams?.lon)
  ) {
    return "";
  }

  const params = new URLSearchParams({
    lat: searchParams.lat.toString(),
    lon: searchParams.lon.toString(),
    appid: process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY,
  });

  const url = `${base_url}?${params.toString()}`;

  return url;
};

// Custom hook for fetching arrest logs
export function useQueryBuilder({
  searchParams,
  filterParams,
  base_url,
  orderBy,
  type,
}: QueryBuilderProps) {
  return useQuery({
    queryKey: [base_url, searchParams, filterParams, orderBy], // Key includes search params for caching
    queryFn: async () => {
      let url = "";
      switch (type) {
        case "arrest_log":
          url = buildArrestLogsUrl({
            searchParams,
            filterParams,
            base_url,
            orderBy,
          });
          break;
        case "police_incident":
          url = buildArrestLogsUrl({
            searchParams,
            filterParams,
            base_url,
            orderBy,
          });
          break;
        case "weather":
          url = buildOpenWeatherUrl({
            searchParams,
            base_url: base_url,
          });
          break;
        default:
          break;
      }

      if (!url) return;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
    staleTime: 300000, // Cache data for 5 minutes
  });
}
