import { useState } from "react";

import { ArrestLogType } from "@/types/arrestLog.interface";

type useArrestLogTableArgs = {
  arrestLogs: ArrestLogType[];
  arrestLogCount: number;
};
export function useArrestLogTable({
  arrestLogs,
  arrestLogCount,
}: useArrestLogTableArgs) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 15;
  const numOfPages = Math.ceil(arrestLogCount / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const displayLogs = arrestLogs.slice(firstIndex, lastIndex);

  return { numOfPages, displayLogs, currentPage, setCurrentPage };
}
