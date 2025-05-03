import { useState, useMemo } from "react";

export function useTableHeaderFilter() {
  // State to manage the header filter value and direction

  const [headerFilter, setHeaderFilter] = useState<string | null>(null);
  const [filterDirection, setFilterDirection] = useState<string | null>(null);

  const filterText = useMemo(() => {
    if (!headerFilter && !filterDirection) return "DATE_ARRESTED DESC";

    return `${headerFilter} ${filterDirection}`;
  }, [headerFilter, filterDirection]);

  return {
    headerFilter,
    setHeaderFilter,
    filterDirection,
    setFilterDirection,
    filterText,
  };
}
