"use client";

import Searchbar from "@/components/data-table/searchbar";
import { AlertCircle, Columns3 } from "lucide-react";
import { useState } from "react";
import { DataTable } from "../../components/data-table/data-table";
import { SelectColumnModal } from "../../components/data-table/select-column-modal";
import { Paginate } from "../../components/paginate";
import { useArrestLogTable } from "../../hooks/data-table/useArrestLogTable";

export default function DataTableWrapper() {
  const {
    displayLogs,
    numOfPages,
    currentPage,
    count,
    dataCategories,
    selectedCategory,
    activeFields,
    setCurrentPage,
    setSelectedCategory,
    filterText,
    setFilterText,
    activeLoading,
    activeError,
    searchArrestLogs,
    visibleColumns,
    columnSetters,
    checkAllVisibleColumns,
    uncheckAllVisibleColumns,
  } = useArrestLogTable();

  const [selectColumns, setSelectColumns] = useState(false);

  if (activeError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 px-4">
        <div className="rounded-full bg-red-100 dark:bg-red-950/50 p-3">
          <AlertCircle
            className="size-8 text-red-600 dark:text-red-400"
            strokeWidth={1.5}
          />
        </div>
        <p className="text-body-sm font-semibold text-gray-900 dark:text-white">
          Something went wrong
        </p>
        <p className="text-caption text-gray-500 dark:text-gray-400 text-center max-w-sm">
          {activeError.message}
        </p>
      </div>
    );
  }

  return (
    <>
      {selectColumns && (
        <SelectColumnModal
          handleClose={() => setSelectColumns(false)}
          displayLogFields={activeFields}
          visibleColumns={visibleColumns}
          columnSetters={columnSetters}
          selectedCategory={selectedCategory}
          checkAllVisibleColumns={checkAllVisibleColumns}
          uncheckAllVisibleColumns={uncheckAllVisibleColumns}
        />
      )}

      <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-gray-100/80 dark:bg-neutral-800/50 w-fit">
            {dataCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? "bg-white dark:bg-neutral-700/80 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-neutral-700/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Searchbar searchArrestLogs={searchArrestLogs} />
            <button
              type="button"
              onClick={() => setSelectColumns(true)}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100/80 dark:bg-neutral-800/50 hover:bg-white dark:hover:bg-neutral-700/80 hover:text-gray-900 dark:hover:text-white shadow-sm transition-colors duration-200"
            >
              <Columns3 className="size-4 shrink-0" strokeWidth={1.5} />
              Columns
            </button>
          </div>
        </div>

        <DataTable
          displayLogs={displayLogs}
          displayFields={activeFields}
          count={count}
          currentPage={currentPage}
          numOfPages={numOfPages}
          filterText={filterText}
          setFilterText={setFilterText}
          activeLoading={activeLoading}
          visibleColumns={visibleColumns}
        />

        {numOfPages > 1 && (
          <div className="flex justify-center py-4">
            <Paginate
              count={numOfPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </>
  );
}
