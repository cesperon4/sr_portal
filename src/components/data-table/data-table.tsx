"use client";

import { TableRowModal } from "@/components/data-table/table-row-modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";
import { ArrowDown, ArrowUp, Database, FileSearch } from "lucide-react";
import { useState } from "react";
import {
  type DisplayLog,
  type Field,
  type VisibleFields,
} from "../../types/openDataPortal.type";

interface DataTableProps {
  displayLogs: DisplayLog[];
  displayFields: Field[];
  count: number;
  currentPage: number;
  numOfPages: number;
  filterText: { header: string; direction: string };
  setFilterText: React.Dispatch<
    React.SetStateAction<{ header: string; direction: string }>
  >;
  activeLoading: boolean;
  visibleColumns?: VisibleFields;
}

export function DataTable({
  displayLogs,
  displayFields,
  count,
  filterText,
  setFilterText,
  activeLoading,
  visibleColumns,
}: DataTableProps) {
  const [tableRow, setTableRow] = useState(false);
  const [tableRowModalData, setTableRowModalData] = useState<
    DisplayLog | undefined
  >(undefined);

  const openTableRow = (log: DisplayLog) => {
    setTableRow(true);
    setTableRowModalData(log);
  };

  const closeTableRow = () => {
    setTableRow(false);
  };

  if (!visibleColumns) {
    return null;
  }

  const columnKeys = Object.entries(visibleColumns)
    .filter(([, value]) => value)
    .map(([key]) => key);

  return (
    <div className="flex flex-col gap-4">
      {tableRow && tableRowModalData && (
        <TableRowModal handleClose={closeTableRow} data={tableRowModalData} />
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
            <Database className="size-5 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-body-sm font-semibold text-gray-900 dark:text-white">
              {count.toLocaleString()} {count === 1 ? "record" : "records"}
            </p>
            <p className="text-caption">Click a row to view full details</p>
          </div>
        </div>
      </div>

      {/* Table card */}
      <div className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-20rem)]">
          <Table>
            <TableHeader>
              <TableRow className="border-0 bg-gray-50 dark:bg-neutral-800/80 hover:bg-gray-50 dark:hover:bg-neutral-800/80">
                {columnKeys.map((key) => {
                  const isActive = filterText.header === key;
                  const isAsc = filterText.direction === "ASC";
                  return (
                    <TableHead
                      key={key}
                      className="sticky top-0 z-10 h-12 px-4 bg-gray-50 dark:bg-neutral-800/80 font-semibold text-gray-700 dark:text-gray-300 text-left align-middle whitespace-nowrap border-b border-gray-200 dark:border-neutral-700"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{key}</span>
                        <div className="flex flex-col shrink-0">
                          <button
                            onClick={() =>
                              setFilterText({
                                header: key,
                                direction: isActive && isAsc ? "DESC" : "ASC",
                              })
                            }
                            className={clsx(
                              "p-0.5 rounded transition-colors hover:bg-gray-200 dark:hover:bg-neutral-700",
                              isActive
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                            )}
                            aria-label={`Sort by ${key} ${isActive && !isAsc ? "ascending" : "descending"}`}
                          >
                            {isActive && !isAsc ? (
                              <ArrowDown className="size-3.5" strokeWidth={2} />
                            ) : (
                              <ArrowUp className="size-3.5" strokeWidth={2} />
                            )}
                          </button>
                        </div>
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <TableRow
                    key={i}
                    className="border-b border-gray-100 dark:border-neutral-800/80"
                  >
                    {columnKeys.map((_, j) => (
                      <TableCell
                        key={j}
                        className="px-4 py-3 h-14"
                      >
                        <div className="h-4 rounded bg-gray-200 dark:bg-neutral-700 animate-pulse max-w-[120px]" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : displayLogs.length > 0 ? (
                displayLogs.map((displayLog, rowIndex) => (
                  <TableRow
                    key={displayLog?.attributes?.OBJECTID ?? rowIndex}
                    className={clsx(
                      "cursor-pointer border-b border-gray-100 dark:border-neutral-800/80 transition-colors",
                      rowIndex % 2 === 0
                        ? "bg-white dark:bg-neutral-900"
                        : "bg-gray-50/50 dark:bg-neutral-800/30",
                      "hover:bg-blue-50/70 dark:hover:bg-blue-950/30"
                    )}
                    onClick={() => openTableRow(displayLog)}
                  >
                    {columnKeys.map((columnKey) => {
                      const key = columnKey as keyof typeof displayLog.attributes;
                      const value = displayLog.attributes[key];
                      return (
                        <TableCell
                          key={columnKey}
                          className="px-4 py-3 text-body-sm text-gray-700 dark:text-gray-300 align-middle"
                        >
                          {value != null && (typeof value !== "string" || value !== "") ? (
                            <span className="truncate block max-w-[200px]" title={String(value)}>
                              {String(value)}
                            </span>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500 italic text-sm">
                              —
                            </span>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={columnKeys.length}
                    className="text-center py-16"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="rounded-full bg-gray-100 dark:bg-neutral-800 p-4">
                        <FileSearch className="size-10 text-gray-400 dark:text-gray-500" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-body-sm font-semibold text-gray-900 dark:text-white">
                          No records found
                        </p>
                        <p className="text-caption text-gray-500 dark:text-gray-400 mt-1">
                          Try adjusting search or filters
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
