export interface WeatherData {
    name: string;
    timezone: number;
    sys: {
        state: string,
        sunrise: number,
        sunset: number,
    };
    main: {
        temp: number,
        temp_min: number,
        temp_max: number,
        feels_like: number,
        pressure: number,
        humidity: number,
    };
    weather: {
        main: string,
        description: string,
        icon: string,
    }[];
    wind: {
        speed: number,
    };
    visibility: number;
}