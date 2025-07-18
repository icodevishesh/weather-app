import { useEffect, useState } from "react";
import type { WeatherData } from "./types/weather";
import WeatherCard from "./components/WeatherCard"
import axios from "axios";
import './index.css'


function App() {
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "71bc2898fa35d112e03fe68695aab178";

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      )

      const data: WeatherData = response.data
      setWeather(data)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError("City not found. Please check the spelling and try again.")
        } else if (err.response?.status === 401) {
          setError("Invalid API key. Please check your OpenWeatherMap API key.")
        } else {
          setError("Failed to fetch weather data. Please try again.")
        }
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  // const fetchWeather = async () => {
  //   try {
  //     const res = await axios.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  //     setIsWeather(res.data);
  //     setError("");
  //   } catch (error) {
  //     setError("city not found" + error);
  //     setIsWeather(null)
  //   }
  // }
  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.002 4.002 0 003 15z"
              />
            </svg>
            <h1 className="text-4xl font-bold text-gray-800">Weather App</h1>
          </div>
          <p className="text-gray-600 text-lg">Get real-time weather information for any city worldwide</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name (e.g., London, New York, Tokyo)"
                className="w-full text-lg h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={loading}
              />
            </div>
            <button
              onClick={fetchWeather}
              disabled={loading || !city.trim()}
              className="h-12 px-8 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Get Weather
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-800 text-lg">{error}</p>
            </div>
          </div>
        )}

        {/* Weather Data */}
        {weather && <WeatherCard data={weather} />}

        {/* Instructions */}
        {!weather && !loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center mt-8">
            <svg className="h-16 w-16 text-blue-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.002 4.002 0 003 15z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Welcome to Weather App</h3>
            <p className="text-blue-600">
              Enter a city name above to get started with real-time weather information. You'll see temperature,
              humidity, wind speed, and much more!
            </p>
            <p className="text-sm text-blue-500 mt-2">
              Note: You'll need to add your OpenWeatherMap API key to fetch real data.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App;
