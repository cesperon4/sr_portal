import { useQuery, type UseQueryResult } from "@tanstack/react-query";

interface QueryBuilderProps {
  searchParams?: Record<string, string | number> | undefined;
  filterParams?: Record<string, boolean> | undefined;
  base_url: string | undefined;
  orderBy?: string;
  type: "open_data" | "weather";
  enabled?: boolean;
  objectID?: number | undefined;
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
  objectID,
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

  if (objectID) {
    whereClause = `OBJECTID=${objectID}`;
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
    !process.env.OPEN_WEATHER_API_KEY ||
    !base_url ||
    (!searchParams?.lat && !searchParams?.lon)
  ) {
    return "";
  }

  const params = new URLSearchParams({
    lat: searchParams.lat.toString(),
    lon: searchParams.lon.toString(),
    appid: process.env.OPEN_WEATHER_API_KEY,
  });

  const url = `${base_url}?${params.toString()}`;

  return url;
};

export function useQueryBuilder<T>({
  searchParams,
  filterParams,
  base_url,
  orderBy,
  type,
  enabled,
  objectID,
}: QueryBuilderProps): UseQueryResult<T> {
  return useQuery<T>({
    queryKey: [
      base_url,
      searchParams ?? "searchParams:ALL",
      filterParams ?? "filterParams:ALL",
      orderBy ?? "orderBy:ALL",
      objectID ?? "objectID:ALL",
    ],
    queryFn: async () => {
      let url = "";

      switch (type) {
        case "open_data":
          url = buildArrestLogsUrl({
            searchParams,
            filterParams,
            base_url,
            orderBy,
            objectID,
          });
          break;

        case "weather":
          url = buildOpenWeatherUrl({
            searchParams,
            base_url,
          });
          break;
      }

      if (!url) throw new Error("URL not generated");

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as T;
    },

    refetchInterval: 1000 * 60 * 60,
    staleTime: 300000,
    enabled,
  });
}
