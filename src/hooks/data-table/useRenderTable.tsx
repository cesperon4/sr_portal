import { useCallback, useState } from "react";
import { DataTable } from "../../components/data-table/data-table";
import { ArrestLogType } from "@/types/arrestLog.interface";
import { Paginate } from "../../components/paginate";

interface ArrestLogField {
  alias: string | null;
  defaultValue: string | null;
  domain: string | null;
  name: string;
  sqlType: string | null;
  type: string | null;
}

interface UseRenderTableProps {
  isArrestLogsLoading: boolean;
  arrestLogsError: Error | null;
  arrestLogs: ArrestLogType[];
  arrestLogFields: ArrestLogField[];
  arrestLogCount: number;
}
export function useRenderTable({
  isArrestLogsLoading,
  arrestLogsError,
  arrestLogs,
  arrestLogFields,
  arrestLogCount,
}: UseRenderTableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const renderDataTable = useCallback(() => {
    if (isArrestLogsLoading) return <p>Loading table...</p>;
    if (arrestLogsError) return <p>Error: {arrestLogsError.message}</p>;

    const itemsPerPage = 15;
    const numOfPages = Math.ceil(arrestLogCount / itemsPerPage);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const displayLogs = arrestLogs.slice(firstIndex, lastIndex);
    return (
      <>
        <DataTable
          arrestLogs={displayLogs}
          arrestLogFields={arrestLogFields}
          arrestLogCount={arrestLogCount}
          currentPage={currentPage}
          numOfPages={numOfPages}
        />
        <Paginate count={numOfPages} setCurrentPage={setCurrentPage} />
      </>
    );
  }, [
    isArrestLogsLoading,
    arrestLogsError,
    arrestLogs,
    currentPage,
    arrestLogFields,
    arrestLogCount,
  ]);

  return { renderDataTable };
}
