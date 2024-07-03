import { useEffect, useState } from "react";
import { Cloudy, Search, Cloud} from "lucide-react";
import Forecast from "./components/Forecast";
import "./App.css";

const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;

interface Clouds {
  all: number;
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
          <h1 className="flex flex-row  text-white text-xl  sm:text-3xl font-semibold font-mono">
            <span>
              <span className="text-yellow-500">K</span>umori
            </span>
          </h1>
        </div>
        <div className="flex flex-row items-center  bg-zinc-800 px-4 rounded-xl sm:mx-auto w-30 ">
          <Search color="#ffffff" className="w-4" />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="bg-transparent placeholder-white outline-none text-white font-mono px-3 py-2 sm:text-sm "
          />
        </div>
      </header>
      <main className="w-full h-auto mt-3 flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col lg:w-1/4  gap-4">
          <div className="bg-zinc-800 rounded-xl p-4 min-w-70 text-white">
            {isLoading ? (
              <p className="text-center  text-xl text-white">No Data</p>
            ) : (
              <>
                <h2 className="text-2xl font-mono font-bold">Now</h2>
                <div>
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-4xl">{weather.main.temp.toFixed(1)}°C</p>
                    <img
                      src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                      alt="Weather icon"
                      className="w-[80px] object-contain"
                    />
                  </div>
                  <p className="font-bold py-3">{weather.name}</p>
                  <hr className="w-full border-none h-1 bg-zinc-900"/>
                  <div className="flex  items-center justify-between">
                    <p className="py-4 font-mono">{weather.weather[0].description}</p>
                    <p className="flex flex-row">
                      <span className="mr-2 font-mono ">{weather.clouds.all}%</span>
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
            <h2 className="text-2xl font-mono font-bold">Today's Highlights</h2>
            <div className="grid grid-cols-2 gap-4"></div>
          </div>

          <div className="bg-zinc-800 rounded-xl p-4 text-white">
            <h2 className="text-2xl font-mono font-bold">Today's Forecast</h2>
            <div className="grid grid-cols-4 gap-4"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
