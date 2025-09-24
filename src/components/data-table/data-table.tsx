"use client";

import React, { useEffect, useState } from "react";
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
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

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

  useEffect(() => {
    console.log("headerfilter2: ", headerFilter);
  }, [headerFilter]);

  return (
    <div className={`flex flex-col gap-4 justify-center items-center p-24`}>
      {tableRow && tableRowModalData && (
        <TableRowModal handleClose={closeTableRow} data={tableRowModalData} />
      )}
      <span className="mr-auto font-semibold">{`${arrestLogCount} records`}</span>
      <Table className={``}>
        <TableCaption>{""}</TableCaption>
        <TableHeader>
          <TableRow>
            {arrestLogFields?.map((x: ArrestLogField) => {
              if (visibleColumns[x.name])
                return (
                  <TableHead key={x.name}>
                    <div className="flex gap-2 items-center">
                      <span>{x.name}</span>
                      <div>
                        <TiArrowSortedUp
                          className={`hover:text-gray-200 cursor-pointer ${
                            headerFilter === x.name &&
                            filterDirection === "ASC" &&
                            "text-yellow-400"
                          }`}
                          onClick={() => {
                            setHeaderFilter(x.name);
                            setFilterDirection("ASC");
                          }}
                        />

                        <TiArrowSortedDown
                          className={`hover:text-gray-200 cursor-pointer ${
                            headerFilter === x.name &&
                            filterDirection === "DESC" &&
                            "text-yellow-400"
                          }`}
                          onClick={() => {
                            setHeaderFilter(x.name);
                            setFilterDirection("DESC");
                          }}
                        />
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
                  className="cursor-pointer"
                  onClick={() => {
                    openTableRow(arrestLog);
                  }}
                >
                  {Object.keys(visibleColumns).map((columnKey) => {
                    if (
                      visibleColumns[columnKey as keyof typeof visibleColumns]
                    ) {
                      const key =
                        columnKey as keyof typeof arrestLog.attributes; // Ensure type safety
                      return (
                        <TableCell key={key}>
                          {arrestLog.attributes[key]}{" "}
                        </TableCell>
                      );
                    }
                    return null;
                  })}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell>0 logs returned</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <Paginate /> */}
    </div>
  );
}
