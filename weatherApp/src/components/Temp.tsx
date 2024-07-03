import { ThermometerSun, ThermometerSnowflake } from "lucide-react";

interface Props {
  tempmin: number;
  tempmax: number;
}

function TemperatureDisplay({ tempmin, tempmax }: Props) {
  return (
    <div className="bg-zinc-900 flex flex-col lg:flex-row justify-between p-4 w-full rounded-xl gap-4">
      <div className="flex flex-col items-center lg:items-start">
        <h3 className="text-xs lg:text-lg font-semibold pb-2 text-gray-50">Temp max</h3>
        <div className="flex flex-row items-center gap-2">
          <ThermometerSun color="#ffffff" className="h-auto w-auto lg:h-9 lg:w-9" />
          <p className="text-sm lg:text-xl">{tempmax.toFixed(1)}°C</p>
        </div>
      </div>
      <div className="flex flex-col items-center lg:items-start">
        <h3 className="text-xs lg:text-lg font-semibold pb-2 text-gray-50">Temp min</h3>
        <div className="flex flex-row items-center gap-2">
          <ThermometerSnowflake color="#ffffff" className="h-auto w-auto lg:h-7 lg:w-7" />
          <p className="text-sm lg:text-xl">{tempmin.toFixed(1)}°C</p>
        </div>
      </div>
    </div>
  );
}

export default TemperatureDisplay;
