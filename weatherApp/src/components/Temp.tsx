import { ThermometerSun, ThermometerSnowflake } from "lucide-react";

interface Props {
  mintemp: number;
  maxtemp: number;
}

function TemperatureDisplay({   mintemp,  maxtemp }: Props) {
  return (
    <div className="bg-gradient-to-br shadow-2xl from-zinc-800 to-zinc-900 flex flex-col  justify-between p-4 w-full rounded-xl gap-4">
       <h2 className='font-bold  font-3xl'>Temp Max & Min</h2>
      <div className="flex flex-row-rev  justify-around lg:justify-between">
        <div className="flex flex-col items-center lg:items-start">
          <h3 className="text-xs lg:text-lg  pb-2  text-zinc-500 font-normal">Temp max</h3>
          <div className="flex flex-row items-center gap-2">
            <ThermometerSun color="#ffffff" className="h-auto w-auto lg:h-7 lg:w-7 xl:w-9 xl:h-9" />
            <p className="text-sm sm:text-xl md:text-xl xl:text-2xl">{ maxtemp.toFixed(1)}°C</p>
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <h3 className="text-xs lg:text-lg font-normal pb-2  text-zinc-500">Temp min</h3>
          <div className="flex flex-row items-center gap-2">
            <ThermometerSnowflake color="#ffffff" className="h-auto w-auto lg:h-6 lg:w-6 xl:w-8 xl:h-8" />
            <p className="text-sm sm:text-xl md:text-xl xl:text-2xl">{mintemp.toFixed(1)}°C</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemperatureDisplay;
