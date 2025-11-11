"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDataContext } from "../../context/DataContext";
import { TableRowModal } from "@/components/data-table/table-row-modal";
import { ArrowUp, ArrowDown, Database } from "lucide-react";
import clsx from "clsx";

interface ArrestLogType {
  attributes: {
    AGE: string | null;
    ARREST_STATUS: string | null;
    ArrestLocationAptFlr: string | null;
    ArrestLocationCity: string | null;
    ArrestLocationStreet: string | null;
    ArrestLocationStreetNBR: string | null;
    Arrest_Charge: string | null;
    Arrest_ID: string | null;
    Case_Number: string | null;
    Charge_Description: string | null;
    Charge_Sequence: string | null;
    DATE_ARRESTED: string | null;
    DOB: string | null;
    Degree: string | null;
    FIRSTNAME: string | null;
    LASTNAME: string | null;
    MIDDLENAME: string | null;
    OBJECTID: number | null;
    OBJECTID_1: number | null;
    RACE: string | null;
    SEX: string | null;
    SUFFIX: string | null;
    TIME_ARREST: string | null;
    UNIQUEKEY: string | null;
  };
}

interface ArrestLogField {
  alias: string | null;
  defaultValue: string | null;
  domain: string | null;
  name: string;
  sqlType: string | null;
  type: string | null;
}

interface DataTableProps {
  arrestLogs: ArrestLogType[];
  arrestLogFields: ArrestLogField[];
  arrestLogCount: number;
  currentPage: number;
  numOfPages: number;
  headerFilter: string | null;
  setHeaderFilter: (value: string | null) => void;
  filterDirection: string | null;
  setFilterDirection: (value: string | null) => void;
}

export function DataTable({
  arrestLogs,
  arrestLogFields,
  arrestLogCount,
  headerFilter,
  setHeaderFilter,
  filterDirection,
  setFilterDirection,
}: DataTableProps) {
  const { visibleColumns } = useDataContext();
  const [tableRow, setTableRow] = useState(false);
  const [tableRowModalData, setTableRowModalData] = useState<
    ArrestLogType | undefined
  >(undefined);

  const openTableRow = (arrestLog: ArrestLogType) => {
    setTableRow(true);
    setTableRowModalData(arrestLog);
  };

  const closeTableRow = () => {
    setTableRow(false);
  };

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-12 mx-auto">
      {tableRow && tableRowModalData && (
        <TableRowModal handleClose={closeTableRow} data={tableRowModalData} />
      )}

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Database className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Arrest Logs
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {arrestLogCount.toLocaleString()}{" "}
              {arrestLogCount === 1 ? "record" : "records"}
            </p>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>{""}</TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                {arrestLogFields?.map((x: ArrestLogField) => {
                  if (visibleColumns[x.name])
                    return (
                      <TableHead
                        key={x.name}
                        className="font-semibold text-gray-700"
                      >
                        <div className="flex gap-2 items-center whitespace-nowrap">
                          <span>{x.name}</span>
                          <div className="flex flex-col">
                            <button
                              onClick={() => {
                                setHeaderFilter(x.name);
                                setFilterDirection("ASC");
                              }}
                              className={clsx(
                                "p-0.5 rounded transition-colors hover:bg-gray-200",
                                {
                                  "text-blue-600":
                                    headerFilter === x.name &&
                                    filterDirection === "ASC",
                                  "text-gray-400":
                                    headerFilter !== x.name ||
                                    filterDirection !== "ASC",
                                }
                              )}
                              aria-label={`Sort ${x.name} ascending`}
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                setHeaderFilter(x.name);
                                setFilterDirection("DESC");
                              }}
                              className={clsx(
                                "p-0.5 rounded transition-colors hover:bg-gray-200",
                                {
                                  "text-blue-600":
                                    headerFilter === x.name &&
                                    filterDirection === "DESC",
                                  "text-gray-400":
                                    headerFilter !== x.name ||
                                    filterDirection !== "DESC",
                                }
                              )}
                              aria-label={`Sort ${x.name} descending`}
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
              {arrestLogs.length > 0 ? (
                arrestLogs.map((arrestLog) => {
                  return (
                    <TableRow
                      key={arrestLog?.attributes.OBJECTID}
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        openTableRow(arrestLog);
                      }}
                    >
                      {Object.keys(visibleColumns).map((columnKey) => {
                        if (
                          visibleColumns[
                            columnKey as keyof typeof visibleColumns
                          ]
                        ) {
                          const key =
                            columnKey as keyof typeof arrestLog.attributes;
                          return (
                            <TableCell key={key} className="text-gray-700">
                              {arrestLog.attributes[key] || (
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
                    colSpan={arrestLogFields?.length}
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

      {/* Pagination placeholder */}
      {/* <Paginate /> */}
    </div>
  );
}
