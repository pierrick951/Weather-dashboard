import { useEffect, useState } from "react";
import { Cloudy, Search } from "lucide-react";
import Forecast from "./components/Forecast";
import "./App.css";

const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;

type Props = {};

export default function App({}: Props) {
  const [weather, setWeather] = useState<any>("");
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
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="App min-h-screen bg-zinc-950 bg-cover bg-fixed px-4">
      <header className="flex p-3 flex-col items-center sm:flex-row">
        <div className="flex flex-row items-center py-3">
          <Cloudy color="#ffffff" className="mr-2 " />
          <h1 className="flex flex-row  text-white text-xl  sm:text-3xl font-semibold font-mono">
            <span>
              <span className="text-yellow-500">K</span>umori
            </span>
          </h1>
        </div>
        <div className="flex flex-row items-center  bg-zinc-800 px-4 rounded-xl sm:mx-auto ">
          <Search color="#ffffff" className="w-4" />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="bg-transparent placeholder-white outline-none text-white font-mono px-3 py-2 sm:text-sm"
          />
        </div>
      </header>
      <main className="w-full h-auto mt-3 flex flex-col lg:flex-row gap-4">
        {/* Sidebar */}
        <div className="flex flex-col lg:w-1/4 gap-4">
          {/* Now */}
          <div className="bg-zinc-700 rounded-xl p-4 text-white">
            <h2 className="text-2xl">Now</h2>
            <p>5°C</p>
            <p>Broken Clouds</p>
          </div>
          {/* 5 Days Forecast */}
          <div className="bg-zinc-700 rounded-xl p-4 text-white">
            <h2 className="text-2xl">5 Days Forecast</h2>
            <h2 className="text-2xl">5 Days Forecast</h2>
            <h2 className="text-2xl">5 Days Forecast</h2>
            
            <Forecast />
          </div>
        </div>
        {/* Main Content */}
        <div className="flex flex-col w-full gap-4">
          {/* Today's Highlights */}
          <div className="bg-zinc-700 rounded-xl p-4 text-white">
            <h2 className="text-2xl">Today's Highlights</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-800 p-2 rounded-lg">
                <p>Air Quality Index</p>
                <p>3.90</p>
              </div>
              <div className="bg-zinc-800 p-2 rounded-lg">
                <p>Humidity</p>
                <p>82%</p>
              </div>
              <div className="bg-zinc-800 p-2 rounded-lg">
                <p>Pressure</p>
                <p>1025hPa</p>
              </div>
              <div className="bg-zinc-800 p-2 rounded-lg">
                <p>Visibility</p>
                <p>10km</p>
              </div>
              <div className="bg-zinc-800 p-2 rounded-lg">
                <p>Sunrise</p>
                <p>6:46 AM</p>
              </div>
              <div className="bg-zinc-800 p-2 rounded-lg">
                <p>Sunset</p>
                <p>5:39 PM</p>
              </div>
            </div>
          </div>
          {/* Today's Forecast */}
          <div className="bg-zinc-700 rounded-xl p-4 text-white">
            <h2 className="text-2xl">Today's Forecast</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-zinc-800 p-2 rounded-lg">12 AM</div>
              <div className="bg-zinc-800 p-2 rounded-lg">3 AM</div>
              <div className="bg-zinc-800 p-2 rounded-lg">6 AM</div>
              <div className="bg-zinc-800 p-2 rounded-lg">9 AM</div>
              <div className="bg-zinc-800 p-2 rounded-lg">12 PM</div>
              <div className="bg-zinc-800 p-2 rounded-lg">3 PM</div>
              <div className="bg-zinc-800 p-2 rounded-lg">6 PM</div>
              <div className="bg-zinc-800 p-2 rounded-lg">9 PM</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
