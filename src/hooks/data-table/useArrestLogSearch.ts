import { useCallback, useState } from "react";

export function useArrestLogSearch() {
  const [arrestLogSearchParams, setArrestLogSearchParams] = useState<
    Record<string, string | number>
  >({
    ArrestLocationStreet: "",
  });
  const searchArrestLogs = useCallback(
    (e: string, filter?: string) => {
      if (!filter) {
        alert("Please select a filter");
        return;
      }

      const filterKeyMap: Record<string, string> = {
        "Date Arrested": "DATE_ARRESTED",
        "Arrest Location": "ArrestLocationStreet",
        "First Name": "FirstName",
        "Last Name": "LastName",
      };

      const filterParam = filterKeyMap[filter] || filter;

      setArrestLogSearchParams((prev) => ({
        ...prev,
        [filterParam]: e,
      }));
    },
    [setArrestLogSearchParams]
  );

  return { searchArrestLogs, arrestLogSearchParams };
}
