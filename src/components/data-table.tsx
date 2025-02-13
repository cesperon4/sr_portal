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
import { useDataContext } from "../context/DataContext";
import { TableRowModal } from "@/components/arrest-logs/table-row-modal";
import { SelectColumnModal } from "@/components/arrest-logs/select-column-modal";
import { Button } from "@/components/ui/button";

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
}

export function DataTable({ arrestLogs, arrestLogFields }: DataTableProps) {
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

  const [selectColumns, setSelectColumns] = useState<boolean>(false);
  const openSelectColumns = () => {
    setSelectColumns(true);
  };
  const closeSelectColumns = () => {
    setSelectColumns(false);
  };

  return (
    <div className={`min-w-full flex flex-col gap-8`}>
      <div className={``}>
        <Button
          variant="outline"
          onClick={() => {
            openSelectColumns();
          }}
        >
          Select Columns
        </Button>
      </div>
      {selectColumns && (
        <SelectColumnModal
          handleClose={closeSelectColumns}
          arrestLogFields={arrestLogFields}
        />
      )}
      {tableRow && tableRowModalData && (
        <TableRowModal handleClose={closeTableRow} data={tableRowModalData} />
      )}
      <Table className={`min-w-full`}>
        <TableCaption>{""}</TableCaption>
        <TableHeader>
          <TableRow>
            {arrestLogFields?.map((x: ArrestLogField) => {
              if (visibleColumns[x.name])
                return <TableHead key={x.name}>{x.name}</TableHead>;
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
    </div>
  );
}
