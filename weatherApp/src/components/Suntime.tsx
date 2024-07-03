import {Sun , Moon} from 'lucide-react'


interface Props  {
     
    sunrise:number,
    sunset:number

}
function Suntime({ sunrise, sunset}: Props) {

    const formatTime = (timestamp: number) => {



        const date = new Date(timestamp * 1000); 
        const hours = date.getHours().toString().padStart(2, "0")
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;

    }


  return (
<div className="bg-zinc-900 flex flex-col lg:flex-row justify-between p-4 w-full rounded-xl gap-4">
      <div className="flex flex-col items-center lg:items-start">
        <h3 className="text-xs lg:text-lg font-semibold pb-2">Sunrise</h3>
        <div className="flex flex-row items-center gap-2">
          <Sun color="#ffffff" className="h-auto w-auto lg:h-8 lg:w-8 hover:animate-spin" />
          <p className="text-sm sm:text-xl md:text-2xl xl:text-3xl">{formatTime(sunrise)}</p>
        </div>
      </div>
      <div className="flex flex-col items-center lg:items-start">
        <h3 className="text-xs lg:text-lg font-semibold pb-2">Sunset</h3>
        <div className="flex flex-row items-center gap-2">
          <Moon color="#ffffff" className="h-auto w-auto lg:h-8 lg:w-8" />
          <p className="text-sm sm:text-xl md:text-2xl xl:text-3xl">{formatTime(sunset)}</p>
        </div>
      </div>
    </div>
  )
}
export default Suntime