import { Droplets } from "lucide-react";
interface Props  {
    humide:string,
};

export default function Humidity({humide}: Props) {
  return (
    <div className="bg-zinc-900 flex flex-col lg:flex-row justify-between p-4 w-full rounded-xl gap-4">
        <div className="flex flex-col items-center lg:items-start">
          <h3 className="text-xs lg:text-lg font-semibold pb-2 text-gray-50">
          Humidity
          </h3>
          <div className="flex flex-row items-center gap-2">
            <Droplets
              color="#ffffff"
              className="h-auto w-auto lg:h-9 lg:w-9"
            />
            <p className="text-sm lg:text-xl">{humide} %</p>
          </div>
        </div>
    </div>
  );
}
