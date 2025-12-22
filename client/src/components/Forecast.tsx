import { Card } from "@/components/ui/card";
import { WeatherIcon } from "./WeatherIcon";
import { format, parseISO } from "date-fns";
import type { WeatherData } from "@/hooks/use-weather";

interface ForecastProps {
  data: WeatherData;
}

export function Forecast({ data }: ForecastProps) {
  // Skip today (index 0) and show next 6 days
  const dailyData = data.daily.time.slice(1, 7).map((time, index) => ({
    date: time,
    code: data.daily.weather_code[index + 1],
    max: data.daily.temperature_2m_max[index + 1],
    min: data.daily.temperature_2m_min[index + 1],
  }));

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
        <span className="w-1 h-6 bg-primary rounded-full block"></span>
        7-Day Forecast
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {dailyData.map((day) => (
          <Card 
            key={day.date} 
            className="glass-card p-4 flex flex-col items-center justify-between gap-4 text-center border-0 shadow-sm"
          >
            <span className="text-sm font-medium text-muted-foreground">
              {format(parseISO(day.date), "EEE")}
            </span>
            
            <WeatherIcon code={day.code} className="w-10 h-10" />
            
            <div className="w-full space-y-1">
              <div className="text-lg font-bold">
                {Math.round(day.max)}°
              </div>
              <div className="text-xs text-muted-foreground border-t border-border/50 pt-1 w-full">
                {Math.round(day.min)}°
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
