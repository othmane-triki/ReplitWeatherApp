import { Card } from "@/components/ui/card";
import { WeatherIcon } from "./WeatherIcon";
import { Wind, Thermometer, MapPin } from "lucide-react";
import type { WeatherData } from "@/hooks/use-weather";

interface CurrentWeatherProps {
  data: WeatherData;
  city: string;
}

export function CurrentWeather({ data, city }: CurrentWeatherProps) {
  const current = data.current;
  const todayMax = data.daily.temperature_2m_max[0];
  const todayMin = data.daily.temperature_2m_min[0];

  return (
    <Card className="glass-panel border-0 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="p-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Current Location</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              {city}
            </h2>
            <div className="mt-2 text-lg text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-6xl md:text-7xl font-bold font-display tracking-tighter text-gradient">
                {Math.round(current.temperature_2m)}°
              </div>
              <div className="text-muted-foreground font-medium">
                H: {Math.round(todayMax)}° L: {Math.round(todayMin)}°
              </div>
            </div>
            <div className="p-4 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-white/60">
              <WeatherIcon code={current.weather_code} className="w-16 h-16 md:w-20 md:h-20" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white/40 rounded-xl p-4 flex items-center gap-3 border border-white/30">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase">Wind Speed</p>
              <p className="text-lg font-semibold">{current.wind_speed_10m} km/h</p>
            </div>
          </div>
          
          <div className="bg-white/40 rounded-xl p-4 flex items-center gap-3 border border-white/30">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <Thermometer className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase">Feels Like</p>
              <p className="text-lg font-semibold">{Math.round(current.temperature_2m)}°</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
