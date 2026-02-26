"use client";
import React, { Suspense, useEffect, useState } from "react";

import { Header } from "@/components/header";
import MapWrapper from "@/components/map/map-wrapper";
import { ProfileSettings } from "@/components/user/profile-settings";
import { ArrestLogProvider } from "@/context/ArrestLogContext";
import { useUserContext } from "@/context/UserContext";
import { useAuth } from "@/hooks/auth/useAuth";
import { useProfileSettings } from "@/hooks/user/useProfileSettings";
import { type HeaderSelect } from "@/types/header.interface";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import ProfileWrapper from "../../components/profile/profile-wrapper";
import { Loader } from "../../components/ui/loader";

const DataTableWrapper = React.lazy(
  () => import("@/components/data-table/data-table-wrapper"),
);
const Charts = React.lazy(() => import("@/components/charts/charts"));
const CommunityContainer = React.lazy(
  () => import("@/components/community/community-container"),
);

export default function Dashboard() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const { data: session, status: sessionStatus } = useSession();
  const { loading, isAuthenticated } = useAuth();
  const { isLoggingOut } = useUserContext();
  const { isProfileSettingsOpen, setIsProfileSettingsOpen } =
    useProfileSettings();

  const selectedView = searchParams.get("view") || "Profile";

  const loadingState = useMemo(() => {
    if (isLoggingOut || sessionStatus === "loading" || loading) return true;
    return false;
  }, [isLoggingOut, sessionStatus, loading, isAuthenticated]);

  useEffect(() => {
    if (loadingState) return;

    if (!isAuthenticated && sessionStatus !== "unauthenticated") {
      const timeout = setTimeout(() => {
        router.push("/");
      }, 100); // 100–300ms is usually enough

      return () => clearTimeout(timeout);
    }
  }, [loading, isAuthenticated, router, session, sessionStatus, isLoggingOut]);

  const [view, setView] = useState<HeaderSelect>(selectedView as HeaderSelect);

  useEffect(() => {
    const currentView = searchParams.get("view") || "Profile"; //avoid intial re render when currentView === nextview
    const nextView = view.toLowerCase();

    if (currentView !== nextView) {
      router.replace(`/dashboard?view=${nextView}`);
    }
  }, [view, searchParams, router]);

  const toggleView = (view: HeaderSelect) => setView(view);

  if (isLoggingOut) return <Loader text={"Logging out..."} />;

  return (
    <div className="grid grid-rows-1 items-center justify-items-center gap-8 font-(family-name:--font-geist-sans)">
      {isProfileSettingsOpen && (
        <ProfileSettings setIsProfileSettingsOpen={setIsProfileSettingsOpen} />
      )}
      <Header
        view={view}
        toggleView={toggleView}
        setIsProfileSettingsOpen={setIsProfileSettingsOpen}
      />

      <main className="flex flex-col gap-8 w-full">
        {view === "Profile" && (
          <Suspense fallback={<Loader text={"Loading map..."} />}>
            <ProfileWrapper />
          </Suspense>
        )}
        {view === "Map" && (
          <Suspense fallback={<Loader text={"Loading map..."} />}>
            <MapWrapper />
          </Suspense>
        )}
        {view === "Table" && (
          <Suspense fallback={<Loader text={"Fetching arrest logs..."} />}>
            <ArrestLogProvider>{<DataTableWrapper />}</ArrestLogProvider>
          </Suspense>
        )}
        {view === "Chart" && (
          <Suspense fallback={<Loader text={"Fetching arrest logs..."} />}>
            <Charts />
          </Suspense>
        )}
        {view === "Community" && (
          <Suspense fallback={<Loader text={"Loading community feed ..."} />}>
            <CommunityContainer />
          </Suspense>
        )}
      </main>
    </div>
  );
}
