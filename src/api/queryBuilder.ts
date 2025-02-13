import { useQuery } from "@tanstack/react-query";

const buildArrestLogsUrl = ({ searchParams, base_url }: queryBuilderProps) => {
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

  const params = new URLSearchParams({
    where: whereClause, // Default filter to return all results
    outFields: "*", // Fetch all fields
    outSR: "4326", // Spatial reference
    f: "json", // Response format
    ...searchParams, // Add custom search params
  });

  return `${base_url}?${params.toString()}`;
};

interface queryBuilderProps {
  searchParams: Record<string, string | number> | undefined;
  base_url: string | undefined;
}

// Custom hook for fetching arrest logs
export function useQueryBuilder({ searchParams, base_url }: queryBuilderProps) {
  return useQuery({
    queryKey: [base_url, searchParams], // Key includes search params for caching
    queryFn: async () => {
      const url = buildArrestLogsUrl({ searchParams, base_url });
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
    staleTime: 300000, // Cache data for 5 minutes
  });
}
