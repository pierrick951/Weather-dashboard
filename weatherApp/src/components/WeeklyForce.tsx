interface Props {
    dateo:string;
    temp:number;
   icon:string
}


function WeeklyForce({dateo, icon, temp}: Props) {
    const dateObj = new Date(dateo);
    const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const dayOfMonth = dateObj.getDate();
  return (
    <div className="w-full bg-gradient-to-br shadow-2xl from-zinc-800 to-zinc-900 p-3 text-white rounded-xl">
        <div className="flex flex-row items-center">
                   <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="" />
            <p className="text-white text-xl lg:text-2xl font-mono">{temp.toFixed(1)}</p>
        </div>
        <p>{dayOfMonth}{dayOfWeek}</p>
    </div>
  )
}
export default WeeklyForce