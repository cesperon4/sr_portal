import { type MarkerDataType } from "@/types/map.interface";
import { useCallback, useState } from "react";

type MapModalDetails = {
  isOpen: boolean;
  id: number | null;
  type: MarkerDataType | null;
};
export function useMapModal() {
  const [mapModalDetails, setMapModalDetails] = useState<MapModalDetails>({
    isOpen: false,
    id: null,
    type: null,
  });

  const openMapModal = useCallback((id: number, type: MarkerDataType) => {
    if (!id) {
      console.log("modal did not open incident does not occur");
      return;
    }

    setMapModalDetails((prev) => ({
      isOpen: true,
      id,
      type: type,
    }));
  }, []);

  const closeMapModal = () => {
    setMapModalDetails((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return {
    mapModalDetails,
    openMapModal,
    closeMapModal,
  };
}
