import React from "react";

interface Props {
  dateo: string;
  temp: number;
  icon: string;
  desc:string;
  feel:number;
}

const formatAMPM = (date: Date) => {
  let hours = date.getHours();

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  const strTime = `${hours}  ${ampm}`;
  return strTime;
};

const DailyForecast: React.FC<Props> = ({ dateo, temp, icon ,desc,feel}) => {
  const dateObject = new Date(dateo);

  const formattedTime = formatAMPM(dateObject);

  return (
    <div className="w-auto h-auto   xl:text-start sm:text-start bg-gradient-to-br shadow-2xl from-zinc-800 to-zinc-900 p-2 gap-5 text-zinc-500 rounded-xl">
      <h3 className="font-mono text-lg lg:text-xl xl:text-2xl p-3 font-semibold">{formattedTime}</h3>
      <div className=" flex  flex-row justify-around  items-center">
        <div className="flex flex-row items-center">
          <p className="text-sm md:text-lg lg:text:xl xl:text-2xl font-mono  text-white">{temp.toFixed(0)}°C</p>
          <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt=""  className="w-auto h-auto lg:w-20 lg-h-20"/>
        </div>
        <div>
          <p className="text-bold text-xl pb-2 xl:text-3xl">{desc}</p>
          <p className="flex gap-3 text-gray-200 font-mono text-sm ">
            <span>Feel Like</span>
            <span>{feel.toFixed(1)}°C</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyForecast;
