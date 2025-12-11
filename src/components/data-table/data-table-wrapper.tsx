import Searchbar from "@/components/data-table/searchbar";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
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

  const [selectColumns, setSelectColumns] = useState<boolean>(false);
  const openSelectColumns = () => {
    setSelectColumns(true);
  };
  const closeSelectColumns = () => {
    setSelectColumns(false);
  };

  if (activeError) return <p>Error: {activeError.message}</p>;
  return (
    <>
      {selectColumns && (
        <SelectColumnModal
          handleClose={closeSelectColumns}
          displayLogFields={activeFields}
          visibleColumns={visibleColumns}
          columnSetters={columnSetters}
          selectedCategory={selectedCategory}
          checkAllVisibleColumns={checkAllVisibleColumns}
          uncheckAllVisibleColumns={uncheckAllVisibleColumns}
        />
      )}
      <div className={clsx("flex justify-start gap-3 w-full px-12")}>
        {dataCategories.map((category) => (
          <button
            onClick={() => setSelectedCategory(category)}
            key={category}
            className={clsx(
              "px-4 py-2 rounded-xl text-sm font-medium border border-gray-300 hover:bg-gray-100 transition",
              { "bg-gray-100": selectedCategory === category }
            )}
          >
            {category}
          </button>
        ))}

        <Button
          variant="outline"
          onClick={() => {
            openSelectColumns();
          }}
          className="border-1 border-gray-300 hover:bg-gray-50 rounded-xl ml-auto"
        >
          Select Columns
        </Button>
        <Searchbar searchArrestLogs={searchArrestLogs} />
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
      <Paginate count={numOfPages} setCurrentPage={setCurrentPage} />
    </>
  );
}
