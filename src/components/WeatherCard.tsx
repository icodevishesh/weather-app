import { useEffect, useState } from "react";
import type { WeatherData } from "../types/weather";

interface props {
    data: WeatherData;
}


function WeatherCard({ data }: props) {
    const formatTime = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }
    const [currentTime, setCurrentTime] = useState<string>("");

    const getWeatherGradient = (main: string) => {
        switch (main.toLowerCase()) {
            case "clear":
                return "from-yellow-400 to-orange-500"
            case "clouds":
                return "from-gray-400 to-gray-600"
            case "rain":
                return "from-blue-400 to-blue-600"
            case "snow":
                return "from-blue-200 to-blue-400"
            case "thunderstorm":
                return "from-purple-400 to-purple-700"
            default:
                return "from-blue-400 to-blue-600"
        }
    }

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            // store days
            const day = now.toLocaleDateString('en-US', { weekday: 'long' });
            //store time in 12hrs format
            const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            setCurrentTime(`${day}, ${time}`);
        };

        // Initial call
        updateTime();

        // Update every 1hr
        const interval = setInterval(updateTime, 3600000);
        // Cleanup on unmount
        return () => clearInterval(interval);

    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto mt-6 overflow-hidden bg-white rounded-lg shadow-lg border border-gray-200">
            {/* Header */}
            <div className={`bg-gradient-to-r ${getWeatherGradient(data.weather[0].main)} text-white p-6`}>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            {data.name}, {data.sys.state}
                        </h2>
                        <p className="text-white/90 capitalize mt-1">{data.weather[0].description}</p>
                        <p className="text-white/90 capitalize mt-1">{currentTime}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-4xl font-bold">{Math.round(data.main.temp)}°C</div>
                        <div className="text-white/90 text-sm">Feels like {Math.round(data.main.feels_like)}°C</div>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-4">
                    <img
                        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                        alt={data.weather[0].description}
                        className="w-24 h-24"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                        </svg>
                        <div>
                            <p className="text-sm text-gray-600">Min/Max</p>
                            <p className="font-semibold">
                                {Math.round(data.main.temp_min)}° / {Math.round(data.main.temp_max)}°
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                            />
                        </svg>
                        <div>
                            <p className="text-sm text-gray-600">Humidity</p>
                            <p className="font-semibold">{data.main.humidity}%</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2"
                            />
                        </svg>
                        <div>
                            <p className="text-sm text-gray-600">Wind</p>
                            <p className="font-semibold">{data.wind.speed} m/s</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                        <svg className="h-5 w-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                        <div>
                            <p className="text-sm text-gray-600">Visibility</p>
                            <p className="font-semibold">{(data.visibility / 1000).toFixed(1)} km</p>
                        </div>
                    </div>
                </div>

                <hr className="my-4 border-gray-200" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <div>
                            <p className="text-sm text-gray-600">Pressure</p>
                            <p className="font-semibold">{data.main.pressure} hPa</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                        <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                        <div>
                            <p className="text-sm text-gray-600">Sunrise</p>
                            <p className="font-semibold">{formatTime(data.sys.sunrise)}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                        <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                        </svg>
                        <div>
                            <p className="text-sm text-gray-600">Sunset</p>
                            <p className="font-semibold">{formatTime(data.sys.sunset)}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Weather condition: {data.weather[0].main}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default WeatherCard;
