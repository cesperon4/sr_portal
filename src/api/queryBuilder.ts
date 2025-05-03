import { useQuery } from "@tanstack/react-query";

const buildArrestLogsUrl = ({
  searchParams,
  filterParams,
  base_url,
  orderBy,
}: queryBuilderProps) => {
  console.log("orderBy: ", orderBy);
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
    orderByFields: orderBy,
    // orderByFields: "DATE_ARRESTED DESC", // Sorting by date_arrested in descending order
    ...searchParams, // Add custom search params
  });

  return `${base_url}?${params.toString()}`;
};

interface queryBuilderProps {
  searchParams: Record<string, string | number> | undefined;
  filterParams: Record<string, boolean> | undefined;
  base_url: string | undefined;
  orderBy: string;
}

// Custom hook for fetching arrest logs
export function useQueryBuilder({
  searchParams,
  filterParams,
  base_url,
  orderBy,
}: queryBuilderProps) {
  return useQuery({
    queryKey: [base_url, searchParams, filterParams, orderBy], // Key includes search params for caching
    queryFn: async () => {
      const url = buildArrestLogsUrl({
        searchParams,
        filterParams,
        base_url,
        orderBy,
      });

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
    staleTime: 300000, // Cache data for 5 minutes
  });
}
