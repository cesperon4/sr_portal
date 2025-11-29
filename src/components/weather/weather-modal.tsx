import Image from "next/image";
import { Backdrop } from "../backdrop";

type Weather = {
  description: string;
  icon: string;
  id: number;
  main: string;
};
type ModalDetails = {
  gradient: string;
  iconPath: string;
  name: string;
  high: number;
  low: number;
  temp: number;
  wind_speed: number;
  humidity: number;
  weather: Weather[];
};

type WeatherModalProps = {
  modalDetails: ModalDetails;
  onClose?: () => void; // optional but recommended
};

export default function WeatherModal({
  modalDetails,
  onClose,
}: WeatherModalProps) {
  return (
    <Backdrop onClick={onClose ?? (() => {})}>
      <div
        className={`
          relative 
          w-[90%] max-w-sm 
          p-6 
          rounded-2xl 
          bg-gradient-to-br ${modalDetails.gradient}
          shadow-xl
          text-white 
          backdrop-blur-xl 
          border border-white/20
        `}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/90 hover:text-white text-xl"
        >
          ×
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-4">
          <Image
            src={modalDetails.iconPath}
            alt="weather icon"
            width={80}
            height={80}
            className="drop-shadow-md"
          />
          {modalDetails.weather.map((detail, index) => (
            <span key={index}>{detail.main}</span>
          ))}

          <h2 className="text-xl font-semibold mt-3">{modalDetails.name}</h2>

          <p className="text-5xl font-bold mt-2">{modalDetails.temp}°</p>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/30 my-4" />

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col items-center">
            <span className="text-white/70">High</span>
            <span className="text-lg font-medium">{modalDetails.high}°</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-white/70">Low</span>
            <span className="text-lg font-medium">{modalDetails.low}°</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-white/70">Wind</span>
            <span className="text-lg font-medium">
              {modalDetails.wind_speed} mph
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-white/70">Humidity</span>
            <span className="text-lg font-medium">
              {modalDetails.humidity}%
            </span>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}
