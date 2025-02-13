"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { DataTable } from "../components/data-table";
import { useQueryBuilder } from "../api/queryBuilder"; // Adjust the import path
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Map } from "@/components/map";

export default function Home() {
  const [arrestLogSearchParams, setArrestLogSearchParams] = useState<
    Record<string, string | number>
  >({
    // AGE: "27",
    ArrestLocationStreet: "",
  });

  const searchArrestLogs = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, filter?: string) => {
      if (!filter) {
        alert("Please select a filter");
        return;
      }

      setArrestLogSearchParams((prev) => ({
        ...prev,
        ArrestLocationStreet: e.target.value, // No need for bracket notation here
      }));
    },
    []
  );

  const {
    data: arrestLogs,
    isLoading: isArrestLogsLoading,
    error: arrestLogsError,
  } = useQueryBuilder({
    searchParams: arrestLogSearchParams,
    base_url: process.env.NEXT_PUBLIC_ARREST_LOG_URL,
  });

  const {
    data: policeIncidents,
    isLoading: isPoliceIncidentsLoading,
    error: policeIncidentsError,
  } = useQueryBuilder({
    searchParams: undefined,
    base_url: process.env.NEXT_PUBLIC_POLICE_INCIDENT_URL,
  });

  const [view, setView] = useState<"map" | "table">("map");
  const toggleView = () =>
    setView((prev) => (prev === "map" ? "table" : "map"));

  const renderMap = useCallback(() => {
    if (isPoliceIncidentsLoading) return <p>Loading map...</p>;
    if (policeIncidentsError)
      return <p>Error: {policeIncidentsError.message}</p>;
    return <Map policeIncidents={policeIncidents.features} />;
  }, [isPoliceIncidentsLoading, policeIncidentsError, policeIncidents]);

  const renderDataTable = useCallback(() => {
    if (isArrestLogsLoading) return <p>Loading table...</p>;
    if (arrestLogsError) return <p>Error: {arrestLogsError.message}</p>;
    return (
      <DataTable
        arrestLogs={arrestLogs.features}
        arrestLogFields={arrestLogs.fields}
      />
    );
  }, [isArrestLogsLoading, arrestLogsError, arrestLogs]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header
        view={view}
        searchArrestLogs={searchArrestLogs}
        toggleView={toggleView}
      />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        {view === "map" ? renderMap() : renderDataTable()}

        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] text-red-500">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
