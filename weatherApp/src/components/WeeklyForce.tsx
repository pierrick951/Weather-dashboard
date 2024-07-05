interface Props {
  dateo: string;
  temp: number;
  icon: string;
}

function WeeklyForce({ dateo, icon, temp }: Props) {
  const dateObj = new Date(dateo);
  const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });
  const dayOfMonth = dateObj.getDate();
  return (
    <div className="w-full flex flex-col lg-flex-row bg-gradient-to-br shadow-2xl from-zinc-800 to-zinc-900 p-2 text-white rounded-xl">
      <div className="flex flex-col md:flex-row items-center">
        <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="" />
        <p className="text-sm  md:text-lg xl:text-xl font-mono text-white">
          {temp.toFixed(0)}°C
        </p>
      </div>
      <div className="flex items-center justify-center ">
        <p className=" flex flex-row items-center gap-2 font-mono font-bold text-sm  text-zinc-500   md:text-lg  ">
        
          <span className="text-sm font-extrabold">{dayOfWeek}</span>
          <span className="font-extrabold">{dayOfMonth}</span>
        </p>
      </div>
    </div>
  );
}
export default WeeklyForce;
