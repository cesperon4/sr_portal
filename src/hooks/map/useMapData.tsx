import { useQueryBuilder } from "@/api/queryBuilder";
import { initialCrimeFilterState } from "@/lib/constants";
import {
  type CrimeFilterState,
  type PoliceIncidentMapResponse,
} from "@/types/map.interface";
import { useState } from "react";
import { useGetMapPostsQuery } from "../../../generated/graphql";

export function useMapData() {
  const [crimeFilterState, setCrimeFilterState] = useState<CrimeFilterState>(
    initialCrimeFilterState
  );
  const clearAllCriminalFilters = () => {
    setCrimeFilterState(initialCrimeFilterState);
  };

  const { data, loading, error, networkStatus } = useGetMapPostsQuery({
    variables: {},
    fetchPolicy: "cache-first", // only fetch if cache is empty
    nextFetchPolicy: "cache-and-network", // optional background update
    notifyOnNetworkStatusChange: true,
  }); //refetch the posts using refetch { data, loading, error, refetch}}

  const {
    data: policeIncidents,
    isLoading: isPoliceIncidentsLoading,
    error: policeIncidentsError,
  } = useQueryBuilder<PoliceIncidentMapResponse>({
    searchParams: undefined,
    filterParams: crimeFilterState,
    base_url: process.env.NEXT_PUBLIC_POLICE_INCIDENT_URL,
    type: "open_data",
  });

  return {
    policeIncidents,
    isPoliceIncidentsLoading,
    policeIncidentsError,
    crimeFilterState,
    setCrimeFilterState,
    clearAllCriminalFilters,
    posts: data?.mapPosts?.data,
  };
}
