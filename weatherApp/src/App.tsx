import { useEffect, useState } from "react";
import { Cloudy, Search, Cloud } from "lucide-react";
import Forecast from "./components/Forecast";
import Localisation from "./components/Localisation";
import Temp from "./components/Temp";
import Suntime from "./components/Suntime";
// import Windstats from './components/Windstats'
import Humidity from "./components/Humidity";

import "./App.css";

const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;

interface Clouds {
  all: number;
}
interface Wind {
  deg: number;
  speed: number;
}
interface Coord {
  lat: number;
  lon: number;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}

interface Sys {
  country: string;
  sunsrise: number;
  sunset: number;
}

interface Weather {
  description: string;
  icon: string;
  main: string;
}

interface WeatherData {
  name: string;
  weather: Weather[];
  main: Main;
  coord: Coord;
  clouds: Clouds;
  sys: Sys;
  wind: Wind;
}

type Props = {};

export default function App({}: Props) {
  const [weather, setWeather] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [city, setCity] = useState<string>("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response: Response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric&lang=fr`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: any = await response.json();
        console.log("Weather data:", data);
        setWeather(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        setIsLoading(false);
      }
    };

    const debounceFetchWeather = setTimeout(() => {
      if (city) {
        fetchWeather();
      }
    }, 1000);

    return () => {
      clearTimeout(debounceFetchWeather);
    };
  }, [city]);

  return (
    <div className="App min-h-screen bg-zinc-950 bg-cover bg-fixed px-4 xl:p-10">
      <header className="flex p-3 flex-col items-center sm:flex-row">
        <div className="flex flex-row items-center py-3">
          <Cloudy color="#ffffff" className="mr-2 " />
          <h1 className="flex flex-row  text-gray-100 text-xl  sm:text-3xl font-semibold font-mono">
            <span>
              <span className="text-red-400">K</span>umori
            </span>
          </h1>
        </div>
        <div className="flex flex-row items-center  bg-zinc-800 px-4 rounded-xl sm:mx-auto  ">
          <Search color="#ffffff" className="w-4" />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="bg-transparent placeholder-white outline-none text-gray-100 font-mono px-3 py-2 sm:text-sm "
          />
        </div>
      </header>
      <main className="w-full h-auto mt-3 flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col lg:w-1/4  gap-4">
          <div className="bg-zinc-800 rounded-xl p-4 min-w-70 text-gray-50">
            {isLoading ? (
              <p className="text-center  text-xl  text-gray-50">No Data</p>
            ) : (
              <>
                <h2 className="text-2xl font-mono font-bold text-red-400">Now</h2>
                <div>
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-4xl">{weather.main.temp.toFixed(1)}°C</p>
                    <img
                      src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                      alt="Weather icon"
                      className="w-[80px] object-contain animate-pulse"
                    />
                  </div>
                  {weather && (
                    <Localisation
                      cityname={weather.name}
                      country={weather.sys.country}
                    />
                  )}
                  <hr className="w-full border-none h-1 bg-zinc-900" />
                  <div className="flex  items-center justify-between">
                    <p className="py-4 font-mono">
                      {weather.weather[0].description}
                    </p>
                    <p className="flex flex-row">
                      <span className="mr-2 font-mono ">
                        {weather.clouds.all}%
                      </span>
                      <Cloud color="#ffffff" />
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          <Forecast />
        </div>

        <div className="flex flex-col w-full gap-4">
          <div className="bg-zinc-800 rounded-xl p-4 text-white">
            <h2 className="text-xl font-mono font-bold text-red-400 pb-3">
              Today's Highlights
            </h2>
            {isLoading ? (
              <p className="text-center  text-xl text-gray-50"> No data</p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                  <div className="flex flex-row gap-2 flex-wrap">
                    <Temp
                      tempmin={weather.main.temp_min}
                      tempmax={weather.main.temp_max}
                    />
                  </div>
                  <div className="flex flex-row gap-2 ">
                    <Suntime
                      sunrise={weather.sys.sunrise}
                      sunset={weather.sys.sunset}
                    />
                  </div>
                  <div className="flex flex-row gap-2 ">
                  <Humidity/>
                  </div>
                  <div className="flex flex-row gap-2 ">
                   {/* <Windstats/> */}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="bg-zinc-800 rounded-xl p-4 text-gray-100">
            <h2 className="text-xl font-mono font-bold text-red-400">Today's Forecast</h2>
            <div className="grid grid-cols-4 gap-4"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
