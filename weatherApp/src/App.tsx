import { useEffect, useState } from "react";
import { Cloudy, Search, Cloud } from "lucide-react";

import WeeklyForce from "./components/WeeklyForce";
import Localisation from "./components/Localisation";
import Temp from "./components/Temp";
import Suntime from "./components/Suntime";
import Windstats from "./components/Windstats";
import Humidity from "./components/Humidity";

import "./App.css";

const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;
interface Clouds {
  all: number;
}

interface Wind {
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
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

interface Sys {
  country: string;
  sunrise: number;
  sunset: number;
}

interface Weather {
  description: string;
  icon: string;
  main: string;
  id: number;
}

interface WeatherData {
  name: string;
  weather: Weather[];
  main: Main;
  coord: Coord;
  clouds: Clouds;
  sys: Sys;
  wind: Wind;
  dt: number;
}

interface ForecastListItem {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastListItem[];
  city: {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export default function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [dailyForecast, setDailyForecast] = useState<ForecastListItem[]>([]);
  const [city, setCity] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeatherandForecast = async () => {
      try {
        const weatherResponse: Response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric&lang=fr`
        );
        if (!weatherResponse.ok) {
          throw new Error(`Error: ${weatherResponse.status}`);
        }
        const weatherData: WeatherData = await weatherResponse.json();
        console.log("Weather data:", weatherData);
        setWeather(weatherData);

        const forecastResponse: Response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}&units=metric&lang=fr`
        );

        if (!forecastResponse.ok) {
          throw new Error(`Error ${forecastResponse.status}`);
        }

        const forecastData: ForecastData = await forecastResponse.json();
        console.log("Forecast data:", forecastData);

        forecastData.list.sort((a, b) => a.dt - b.dt);

        const dailyForecastData: ForecastListItem[] = forecastData.list.filter(
          (item) => new Date(item.dt_txt).getHours() === 12
        );

        setForecastData(forecastData);
        setDailyForecast(dailyForecastData);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        setIsLoading(false);
      }
    };

    const debounceFetchWeather = setTimeout(() => {
      if (city) {
        fetchWeatherandForecast();
      }
    }, 1000);

    return () => {
      clearTimeout(debounceFetchWeather);
    };
  }, [city]);
  console.log(dailyForecast);

  return (
    <div className="App min-h-screen bg-zinc-950 bg-cover bg-fixed px-4 xl:p-10">
      <header className="flex p-3 flex-col items-center sm:flex-row">
        <div className="flex flex-row items-center py-3">
          <Cloudy color="#ffffff" className="mr-2 " />
          <h1 className="flex flex-row  text-gray-100 text-xl  sm:text-3xl font-semibold font-mono">
            <span>
              <span className="text-indigo-400">K</span>umori
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
            className="bg-transparent placeholder-white outline-none text-gray-100  px-3 py-2 sm:text-sm lg:text-xl w-[200px] "
          />
        </div>
      </header>
      {isLoading ? (
        <div className="w-full  h-[500px]  flex  flex-col items-center justify-center ">
          <div className="flex  flex-col items-sart">
            <div className="flex flex-row items-center">
              <h1 className="text-white text-4xl  lg:text-6xl font-bold flex flex-col">
                <span>
                  <span className="text-indigo-400">N</span>o Data
                </span>
                <span>Available</span>
              </h1>
              <img
                src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f327_fe0f/512.gif"
                alt="🌧"
                className="w-20 h-20"
              />
            </div>
            <small className="text-indigo-400 py-2 font-mono font-bold">
              Please enter a city for show Data
            </small>
          </div>
        </div>
      ) : (
        <>
          <main className="w-full h-auto mt-3 flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col lg:w-1/4  gap-4">
              <div className="bg-gradient-to-br shadow-2xl from-zinc-800 to-zinc-900 rounded-xl p-4 min-w-70 text-gray-50">
                {!weather ? (
                  <p className="text-center  text-xl  text-gray-50">No Data</p>
                ) : (
                  <>
                    <h2 className="text-2xl font-mono font-bold text-indigo-400">
                      Now
                    </h2>
                    <div>
                      <div className="flex flex-row items-center justify-between">
                        <p className="text-4xl">
                          {weather.main.temp.toFixed(1)}°C
                        </p>
                        <img
                          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                          alt="Weather icon"
                          className="w-[80px] object-contain animate-pulse"
                        />
                      </div>
                      <p className="text-gray-200 font-mono text-sm flex flex-row gap-2">
                        <span>Feel Like</span>
                        <span>{weather.main.feels_like.toFixed(1)}°C</span>
                      </p>
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

              <div className="h-50 min-w-70 bg-zinc-900 rounded-xl h-auto p-4 text-white">
                <h3 className="text-xl font-mono font-bold text-indigo-400 ">
                  5 days Forecast
                </h3>
                {!isLoading && (
                  <ul className="w-full flex flex-col gap-2">
                    {dailyForecast.map((item) => (
                      <WeeklyForce
                        key={item.dt}
                        dateo={item.dt_txt}
                        temp={item.main.temp}
                        icon={item.weather[0].icon}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full gap-4">
              <div className="bg-zinc-900 rounded-xl p-4 text-white">
                <h2 className="text-xl font-mono font-bold text-indigo-400 pb-3">
                  Today's Highlights
                </h2>
                {!weather ? (
                  <p className="text-center  text-xl text-gray-50"> No data</p>
                ) : (
                  <>
                    <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                      <div className="flex flex-row gap-2 flex-wrap">
                        <Temp
                          mintemp={weather.main.temp_min}
                          maxtemp={weather.main.temp_max}
                        />
                      </div>
                      <div className="flex flex-row gap-2 ">
                        <Suntime
                          sunrise={weather.sys.sunrise}
                          sunset={weather.sys.sunset}
                        />
                      </div>
                      <div className="flex flex-row gap-2 ">
                        <Humidity humide={weather.main.humidity} />
                        <Windstats windspeed={weather.wind.speed} />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="bg-zinc-900 rounded-xl p-4 text-gray-100">
                <h2 className="text-xl font-mono font-bold text-indigo-400">
                  Today's Forecast
                </h2>

                <div className="grid grid-cols-8 gap-4">
                  {isLoading ? <p>Loading...</p> : <>saluut la compagnie</>}
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}
