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
  
  export interface WeatherData {
    name: string;
    weather: Weather[];
    main: Main;
    coord: Coord;
    clouds: Clouds;
    sys: Sys;
    wind: Wind;
    dt: number;
  }
  
  export interface ForecastListItem {
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