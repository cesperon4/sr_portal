"use client";

import { useQueryBuilder } from "@/api/queryBuilder";
import {
  type FieldData,
  type MarkerDataType,
  type PoliceIncidentMapResponse,
} from "@/types/map.interface";
import { normalizeIncident } from "@/utils/mapData";
import { useGetPostQuery } from "../../../generated/graphql";
import { Backdrop } from "../backdrop";
import { Loader2, X } from "lucide-react";

type MapModalProps = {
  id: number;
  closeMapModal: () => void;
  type: MarkerDataType;
};

export default function MapModal({ id, closeMapModal, type }: MapModalProps) {
  const {
    data: policeIncident,
    isLoading: isPoliceIncidentLoading,
    error: policeIncidentError,
  } = useQueryBuilder<PoliceIncidentMapResponse>({
    searchParams: undefined,
    filterParams: undefined,
    objectID: type === "incident" ? id : undefined,
    base_url: process.env.NEXT_PUBLIC_POLICE_INCIDENT_URL,
    type: "open_data",
    enabled: type === "incident",
  });

  const { data, loading, error } = useGetPostQuery({
    variables: { id },
    skip: type === "incident",
  });

  if (isPoliceIncidentLoading || loading) {
    return (
      <Backdrop onClick={closeMapModal}>
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-8 py-10 shadow-xl">
          <Loader2 className="size-10 animate-spin text-blue-600 dark:text-blue-400" strokeWidth={1.5} aria-hidden />
          <p className="text-body-sm font-medium text-gray-700 dark:text-gray-300">Loading details…</p>
        </div>
      </Backdrop>
    );
  }

  if (policeIncidentError || error) {
    return (
      <Backdrop onClick={closeMapModal}>
        <div className="rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-8 shadow-xl max-w-md text-center">
          <p className="text-body-sm font-semibold text-gray-900 dark:text-white mb-2">Couldn’t load details</p>
          <p className="text-caption text-gray-600 dark:text-gray-400 mb-6">Something went wrong. Please try again.</p>
          <button
            type="button"
            onClick={closeMapModal}
            className="rounded-xl bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-700 dark:text-gray-300 text-sm font-medium px-4 py-2.5 transition-colors"
          >
            Close
          </button>
        </div>
      </Backdrop>
    );
  }

  const fields: FieldData[] =
    type === "incident" && policeIncident?.features[0]
      ? normalizeIncident(policeIncident.features[0])
      : type === "post" && data?.post
        ? normalizeIncident(data.post)
        : [];

  return (
    <Backdrop onClick={closeMapModal}>
      <div
        role="dialog"
        aria-labelledby="map-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg mx-4 rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-neutral-800 px-6 py-4">
          <h2 id="map-modal-title" className="text-subheading text-gray-900 dark:text-white">
            Incident details
          </h2>
          <button
            type="button"
            onClick={closeMapModal}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Close"
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="px-6 py-5">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((field) => (
              <DetailRow key={`${field.label}-${String(field.value)}`} label={field.label} value={field.value} />
            ))}
          </dl>
        </div>

        <div className="flex justify-end gap-2 px-6 pb-6">
          <button
            type="button"
            onClick={closeMapModal}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </Backdrop>
  );
}

function DetailRow({ label, value }: { label: string; value: string | number }) {
  const display = value ?? "—";
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-label text-gray-500 dark:text-gray-400">{label}</dt>
      <dd className="text-body-sm text-gray-900 dark:text-white break-words">{String(display)}</dd>
    </div>
  );
}
