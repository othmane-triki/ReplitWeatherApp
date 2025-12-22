import { 
  Cloud, 
  CloudDrizzle, 
  CloudFog, 
  CloudLightning, 
  CloudRain, 
  CloudSnow, 
  CloudSun, 
  Sun, 
  Moon,
  Wind
} from "lucide-react";

interface WeatherIconProps {
  code: number;
  className?: string;
  isNight?: boolean;
}

export function WeatherIcon({ code, className = "w-6 h-6", isNight = false }: WeatherIconProps) {
  // WMO Weather interpretation codes (WW)
  // https://open-meteo.com/en/docs
  
  const getIcon = () => {
    switch (true) {
      case code === 0: // Clear sky
        return isNight ? <Moon className={className} /> : <Sun className={`${className} text-amber-500`} />;
      
      case code === 1 || code === 2 || code === 3: // Partly cloudy
        return <CloudSun className={`${className} text-sky-400`} />;
      
      case code >= 45 && code <= 48: // Fog
        return <CloudFog className={`${className} text-slate-400`} />;
      
      case code >= 51 && code <= 55: // Drizzle
        return <CloudDrizzle className={`${className} text-blue-400`} />;
      
      case code >= 61 && code <= 67: // Rain
        return <CloudRain className={`${className} text-blue-500`} />;
      
      case code >= 71 && code <= 77: // Snow
        return <CloudSnow className={`${className} text-cyan-200`} />;
      
      case code >= 80 && code <= 82: // Rain showers
        return <CloudRain className={`${className} text-blue-600`} />;
      
      case code >= 85 && code <= 86: // Snow showers
        return <CloudSnow className={`${className} text-cyan-300`} />;
      
      case code >= 95 && code <= 99: // Thunderstorm
        return <CloudLightning className={`${className} text-purple-500`} />;
        
      default:
        return <Cloud className={`${className} text-gray-400`} />;
    }
  };

  return (
    <div className="relative inline-block animate-float">
      {getIcon()}
    </div>
  );
}
