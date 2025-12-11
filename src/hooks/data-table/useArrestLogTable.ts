import { type ArrestLogResponse } from "@/types/arrestLog.interface";
import { type DataCategory } from "@/types/openDataPortal.type";
import { type PoliceComplaintResponse } from "@/types/policeComplaint.type";
import { type PoliceForceResponse } from "@/types/policeForce.type";
import { type PolicePursuitResponse } from "@/types/policePursuit.type";
import { useEffect, useMemo, useState } from "react";
import { useQueryBuilder } from "../../api/queryBuilder"; // Adjust the import path
import { useDataContext } from "../../context/DataContext";
import { useArrestLogSearch } from "./useArrestLogSearch";

export function useArrestLogTable() {
  const {
    visibleArrestLogColumns,
    visiblePoliceComplaintColumns,
    visiblePolicePursuitColumns,
    visibleUseOfForceColumns,
    columnSetters,
    checkAllVisibleColumns,
    uncheckAllVisibleColumns,
  } = useDataContext();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [selectedCategory, setSelectedCategory] =
    useState<DataCategory>("Arrest Logs");

  const { searchArrestLogs, arrestLogSearchParams } = useArrestLogSearch();

  const [filterText, setFilterText] = useState({
    header: "DATE_ARRESTED",
    direction: "DESC",
  });

  useEffect(() => {
    switch (selectedCategory) {
      case "Arrest Logs":
        setFilterText({ header: "DATE_ARRESTED", direction: "DESC" });
        break;
      case "Police Complaints":
        setFilterText({ header: "Address", direction: "DESC" });
        break;
      case "Police Pursuits":
        setFilterText({ header: "OccurredDate", direction: "DESC" });
        break;
      case "Use of Force Reports":
        setFilterText({ header: "OccurredDate", direction: "DESC" });
        break;
      default:
        return;
    }
  }, [selectedCategory]);

  const queryOrder = useMemo(() => {
    return `${filterText.header} ${filterText.direction}`;
  }, [filterText]);

  const visibleColumns = useMemo(() => {
    switch (selectedCategory) {
      case "Arrest Logs":
        return visibleArrestLogColumns;
      case "Police Complaints":
        return visiblePoliceComplaintColumns;
      case "Police Pursuits":
        return visiblePolicePursuitColumns;
      case "Use of Force Reports":
        return visibleUseOfForceColumns;
      default:
        return visibleArrestLogColumns;
    }
  }, [
    selectedCategory,
    visibleArrestLogColumns,
    visiblePoliceComplaintColumns,
    visiblePolicePursuitColumns,
    visibleUseOfForceColumns,
  ]);

  const {
    data: arrestLogs,
    isLoading: isArrestLogsLoading,
    error: arrestLogsError,
  } = useQueryBuilder<ArrestLogResponse>({
    searchParams: arrestLogSearchParams,
    filterParams: undefined,
    base_url: process.env.NEXT_PUBLIC_ARREST_LOG_URL,
    orderBy: queryOrder,
    type: "open_data",
  });

  const {
    data: policePursuits,
    isLoading: isPolicePursuitsLoading,
    error: policePursuitsError,
  } = useQueryBuilder<PolicePursuitResponse>({
    searchParams: undefined,
    // filterParams: crimeFilterState,
    base_url: process.env.NEXT_PUBLIC_POLICE_PURSUITS,
    orderBy: queryOrder,
    type: "open_data",
    enabled: selectedCategory === "Police Pursuits",
  });

  const {
    data: policeComplaints,
    isLoading: isPoliceComplaintsLoading,
    error: policeComplaintsError,
  } = useQueryBuilder<PoliceComplaintResponse>({
    searchParams: undefined,
    // filterParams: crimeFilterState,
    base_url: process.env.NEXT_PUBLIC_POLICE_COMPLAINTS,
    orderBy: queryOrder,
    type: "open_data",
    enabled: selectedCategory === "Police Complaints",
  });

  const {
    data: policeUseOfForce,
    isLoading: isPoliceUseOfForceLoading,
    error: policeUseOfForceError,
  } = useQueryBuilder<PoliceForceResponse>({
    searchParams: undefined,
    // filterParams: crimeFilterState,
    base_url: process.env.NEXT_PUBLIC_POLICE_USE_OF_FORCE,
    orderBy: queryOrder,
    type: "open_data",
    enabled: selectedCategory === "Use of Force Reports",
  });

  const dataCategories: DataCategory[] = [
    "Arrest Logs",
    "Police Complaints",
    "Police Pursuits",
    "Use of Force Reports",
  ];

  const { activeData, activeFields, activeLoading, activeError } =
    useMemo(() => {
      switch (selectedCategory) {
        case "Arrest Logs":
          return {
            activeData: arrestLogs?.features || [],
            activeFields: arrestLogs?.fields || [], // You can set arrest log fields if needed
            activeLoading: isArrestLogsLoading,
            activeError: arrestLogsError,
          };
        case "Police Complaints":
          return {
            activeData: policeComplaints?.features || [],
            activeLoading: isPoliceComplaintsLoading,
            activeFields: policeComplaints?.fields || [],
            activeError: policeComplaintsError,
          };

        case "Police Pursuits":
          return {
            activeData: policePursuits?.features || [],
            activeFields: policePursuits?.fields || [],
            activeLoading: isPolicePursuitsLoading,
            activeError: policePursuitsError,
          };

        case "Use of Force Reports":
          return {
            activeData: policeUseOfForce?.features || [],
            activeFields: policeUseOfForce?.fields || [],
            activeLoading: isPoliceUseOfForceLoading,
            activeError: policeUseOfForceError,
          };

        default:
          return {
            activeData: [],
            activeFields: [],
            activeLoading: false,
            activeError: null,
          };
      }
    }, [
      selectedCategory,
      arrestLogs,
      policeComplaints,
      policePursuits,
      policeUseOfForce,
    ]);

  const itemsPerPage = 15;
  const numOfPages = Math.ceil(activeData.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const displayLogs = activeData.slice(firstIndex, lastIndex);

  return {
    numOfPages,
    displayLogs,
    count: activeData.length,
    activeFields,
    currentPage,
    dataCategories,
    selectedCategory,
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
  };
}
