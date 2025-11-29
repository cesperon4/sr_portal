import {
  ArrestLogType,
  type ArrestLogField,
} from "@/types/arrestLog.interface";
import { DataTable } from "../../components/data-table/data-table";
import { Paginate } from "../../components/paginate";
import { useArrestLogTable } from "../../hooks/data-table/useArrestLogTable";

// type ArrestLogField = {
//   alias: string;
//   defaultValue: string;
//   domain: string;
//   name: string;
//   sqlType: string;
//   type: string;
// };

type DataTableWrapperProps = {
  isArrestLogsLoading: boolean;
  arrestLogsError: Error | null;
  arrestLogs: ArrestLogType[];
  arrestLogFields: ArrestLogField[];
  arrestLogCount: number;
  headerFilter: string | null;
  setHeaderFilter: (value: string | null) => void;
  filterDirection: string | null;
  setFilterDirection: (value: string | null) => void;
};
export default function DataTableWrapper({
  isArrestLogsLoading,
  arrestLogsError,
  arrestLogs,
  arrestLogFields,
  arrestLogCount,
  headerFilter,
  setHeaderFilter,
  filterDirection,
  setFilterDirection,
}: DataTableWrapperProps) {
  const { displayLogs, numOfPages, currentPage, setCurrentPage } =
    useArrestLogTable({
      arrestLogs,
      arrestLogCount,
    });
  if (isArrestLogsLoading) return <p>Loading table...</p>;
  if (arrestLogsError) return <p>Error: {arrestLogsError.message}</p>;

  return (
    <>
      <DataTable
        arrestLogs={displayLogs}
        arrestLogFields={arrestLogFields}
        arrestLogCount={arrestLogCount}
        currentPage={currentPage}
        numOfPages={numOfPages}
        headerFilter={headerFilter}
        setHeaderFilter={setHeaderFilter}
        filterDirection={filterDirection}
        setFilterDirection={setFilterDirection}
      />
      <Paginate count={numOfPages} setCurrentPage={setCurrentPage} />
    </>
  );
}
