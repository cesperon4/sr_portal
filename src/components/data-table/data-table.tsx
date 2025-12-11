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
import { ArrowDown, ArrowUp, Database } from "lucide-react";
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

  if (activeLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading table...</p>
      </div>
    );
  }

  if (!visibleColumns) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 px-6 lg:px-12">
      {tableRow && tableRowModalData && (
        <TableRowModal handleClose={closeTableRow} data={tableRowModalData} />
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Database className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mt-0.5">
              {count.toLocaleString()} {count === 1 ? "record" : "records"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                {Object.entries(visibleColumns)?.map(([key, value]) => {
                  if (value)
                    return (
                      <TableHead
                        key={key}
                        className="font-semibold text-gray-700"
                      >
                        <div className="flex gap-2 items-center whitespace-nowrap">
                          <span>{key}</span>
                          <div className="flex flex-col">
                            <button
                              onClick={() => {
                                setFilterText(() => ({
                                  header: key,
                                  direction: "ASC",
                                }));
                              }}
                              className={clsx(
                                "p-0.5 rounded transition-colors hover:bg-gray-200",
                                {
                                  "text-blue-600":
                                    filterText.header === key &&
                                    filterText.direction === "ASC",
                                  "text-gray-400":
                                    filterText.header !== key ||
                                    filterText.direction !== "ASC",
                                }
                              )}
                              aria-label={`Sort ${key} ascending`}
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                setFilterText(() => ({
                                  header: key,
                                  direction: "DESC",
                                }));
                              }}
                              className={clsx(
                                "p-0.5 rounded transition-colors hover:bg-gray-200",
                                {
                                  "text-blue-600":
                                    filterText.header === key &&
                                    filterText.direction === "DESC",
                                  "text-gray-400":
                                    filterText.header !== key ||
                                    filterText.direction !== "DESC",
                                }
                              )}
                              aria-label={`Sort ${key} descending`}
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </TableHead>
                    );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayLogs.length > 0 ? (
                displayLogs.map((displayLog) => {
                  return (
                    <TableRow
                      key={displayLog?.attributes.OBJECTID}
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        openTableRow(displayLog);
                      }}
                    >
                      {Object.keys(visibleColumns).map((columnKey) => {
                        if (
                          visibleColumns[
                            columnKey as keyof typeof visibleColumns
                          ]
                        ) {
                          const key =
                            columnKey as keyof typeof displayLog.attributes;
                          return (
                            <TableCell key={key} className="text-gray-700">
                              {displayLog.attributes[key] || (
                                <span className="text-gray-400 italic text-sm">
                                  —
                                </span>
                              )}
                            </TableCell>
                          );
                        }
                        return null;
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow className="hover:bg-white">
                  <TableCell
                    colSpan={displayFields?.length}
                    className="text-center py-12"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Database className="w-12 h-12 text-gray-300" />
                      <p className="text-gray-500 font-medium">
                        No records found
                      </p>
                      <p className="text-sm text-gray-400">
                        Try adjusting your filters
                      </p>
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
