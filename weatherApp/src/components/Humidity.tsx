import { Droplets } from "lucide-react";
interface Props  {
    humide:number,
};

export default function Humidity({humide}: Props) {
  return (
    <div className="bg-gradient-to-br shadow-2xl from-zinc-800 to-zinc-900 flex flex-col lg:flex-row justify-between p-4 w-full rounded-xl gap-4">
        <div className="flex flex-col items-center  w-full">
          <h3 className="text-xs lg:text-lg  pb-2 font-bold  font-mono font-3xl">
          Humidity
          </h3>
          <div className="h-full w-full flex item-center justify-center">
            <div className="flex flex-row items-center justify-center gap-2">
              <Droplets
                color="#ffffff"
                className="h-auto w-auto lg:h-9 lg:w-9"
              />
              <p className="text-sm lg:text-base xl:text-2xl font-normal font-gray-100 ">{humide} %</p>
            </div>
          </div>
        </div>
    </div>
  );
}
