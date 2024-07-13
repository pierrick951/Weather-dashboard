import { Cloudy, Search} from 'lucide-react'

type HeaderProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    city: string;
  };
function Header({onChange, city}: HeaderProps) {
  return (
    <header className="flex p-3 flex-col items-center sm:flex-row">
    <div className="flex flex-row items-center py-3">
      <Cloudy color="#ffffff" className="mr-2 " />
      <h1 className="flex flex-row  text-gray-100 text-xl  sm:text-3xl font-semibold font-mono">
        <span>
          <span className="text-indigo-400">K</span>umori
        </span>
      </h1>
    </div>
    <div className="flex flex-row items-center w-auto  bg-zinc-800 px-3 rounded-xl sm:mx-auto xl:w-[500px] ">
      <Search color="#ffffff" className="w-4" />
      <input
        type="text"
        value={city}
        placeholder="Enter city name"
        onChange={onChange}
        className="bg-transparent placeholder-white outline-none text-gray-100  px-3 py-2 sm:text-sm lg:text-xl xl:w-[500px] w-auto "
      />
    </div>
  </header>
  )
}
export default Header