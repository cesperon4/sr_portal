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

type MapModalProps = {
  id: number;
  closeMapModal: () => void;
  type: MarkerDataType;
};

export default function MapModal({ id, closeMapModal, type }: MapModalProps) {
  console.log("map modal rendered");
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

  console.log("data: ", data);

  if (isPoliceIncidentLoading || loading) {
    console.log("error 1");
    return <Backdrop onClick={closeMapModal}>Loading…</Backdrop>;
  }

  if (policeIncidentError || error) {
    console.log("error 2");

    return (
      <Backdrop onClick={closeMapModal}>
        <div className="bg-white p-6 rounded-xl">Failed to load details</div>
      </Backdrop>
    );
  }

  const fields: FieldData[] =
    type === "incident" && policeIncident?.features[0]
      ? normalizeIncident(policeIncident.features[0])
      : type === "post" && data?.post
      ? normalizeIncident(data.post)
      : [];

  console.log("fields: ", fields);

  return (
    <Backdrop onClick={closeMapModal}>
      <form
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl text-gray-900 p-8 w-[600px] shadow-xl space-y-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">
          Incident Details
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {fields.map((field) => (
            <Field
              key={`${field.label} ${field.value}`}
              label={field.label}
              value={field.value}
            />
          ))}
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="button"
            onClick={closeMapModal}
            className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Close
          </button>
        </div>
      </form>
    </Backdrop>
  );
}

function Field({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        className="border rounded-md px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue={value || ""}
        readOnly
      />
    </div>
  );
}
