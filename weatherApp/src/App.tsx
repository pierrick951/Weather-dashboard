import { useEffect, useState } from "react";
import {Cloud } from "lucide-react";
import Header from '../src/components/Header'
import WeeklyForce from "./components/WeeklyForce";
import Localisation from "./components/Localisation";
import Temp from "./components/Temp";
import Suntime from "./components/Suntime";
import Windstats from "./components/Windstats";
import Humidity from "./components/Humidity";
import DailyForecast from "./components/DailyForecast";
import { WeatherData, ForecastData, ForecastListItem } from "./Types";
import "./App.css";

const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;


export default function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [dailyForecast, setDailyForecast] = useState<ForecastListItem[]>([]);
  const [dayForecast, setDayForecast] = useState<ForecastListItem[]>([]);
  const [city, setCity] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log(forecastData);

  
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

        const firstThreeForecasts: ForecastListItem[] = forecastData.list.slice(
          0,
         6
        );

        setDayForecast(firstThreeForecasts);
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


  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };
  

  return (
    <div className="App min-h-screen bg-zinc-950 bg-cover bg-fixed px-4 xl:p-10">
      <Header  city={city} onChange={handleChange}/>
      {isLoading ? (
        <div className="w-full  h-[500px]  flex  flex-col items-center justify-center ">
          <div className="flex  flex-col items-sart xl:translate-x-7">
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
                <h3 className="text-xl font-mono font-bold text-indigo-400 pb-3 ">
                  5 days Forecast
                </h3>
                {!isLoading && (
                  <ul
                    className="w-full grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2
                   gap-2"
                  >
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
                <h2 className="text-xl font-mono font-bold text-indigo-400 pb-2">
                  Today's Forecast
                </h2>

                {!isLoading && (
                  <ul
                    className="w-full grid grid-col-1 lg:grid-cols-2 sm:grid-cols-3 
                   gap-1 "
                  >
                    {dayForecast.map((item) => (
                      <DailyForecast
                        key={item.dt}
                        dateo={item.dt_txt}
                        temp={item.main.temp}
                        icon={item.weather[0].icon}
                        desc={item.weather[0].description}
                        feel={item.main.feels_like}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}
