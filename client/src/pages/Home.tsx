import { useState, useEffect } from "react";
import { useWeather, useAddLocation } from "@/hooks/use-weather";
import { CitySearch } from "@/components/CitySearch";
import { CurrentWeather } from "@/components/CurrentWeather";
import { Forecast } from "@/components/Forecast";
import { SavedLocations } from "@/components/SavedLocations";
import { Button } from "@/components/ui/button";
import { Bookmark, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Default to London if nothing selected
const DEFAULT_LOCATION = {
  name: "London, United Kingdom",
  lat: 51.5074,
  lon: -0.1278
};

export default function Home() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const { data: weather, isLoading, error } = useWeather(location.lat, location.lon);
  const addLocation = useAddLocation();
  const { toast } = useToast();

  const handleSaveLocation = async () => {
    try {
      await addLocation.mutateAsync({
        name: location.name,
        lat: location.lat,
        lon: location.lon,
      });
      toast({
        title: "Location Saved",
        description: `${location.name} has been added to your favorites.`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save location. It might already exist.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">
            Weather
            <span className="text-primary">.</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">Real-time weather & forecast</p>
        </div>
        
        <CitySearch onSelect={setLocation} />
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-8">
          {isLoading ? (
            <div className="h-96 rounded-3xl bg-white/40 border border-white/40 animate-pulse flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
          ) : error ? (
            <div className="p-8 rounded-3xl bg-destructive/5 border border-destructive/20 text-center">
              <p className="text-destructive font-medium">Failed to load weather data.</p>
              <Button variant="outline" onClick={() => window.location.reload()} className="mt-4">
                Retry
              </Button>
            </div>
          ) : weather ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="relative group">
                <CurrentWeather data={weather} city={location.name} />
                <Button
                  onClick={handleSaveLocation}
                  disabled={addLocation.isPending}
                  className="absolute top-6 right-6 shadow-lg bg-white/80 text-foreground hover:bg-white hover:text-primary backdrop-blur-sm rounded-full w-12 h-12 p-0 transition-all z-20"
                >
                  {addLocation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </Button>
              </div>
              
              <Forecast data={weather} />
            </div>
          ) : null}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <SavedLocations 
            onSelect={setLocation}
            currentLat={location.lat}
            currentLon={location.lon}
          />

          {/* Decorative Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-blue-600 text-white shadow-lg shadow-primary/20">
            <h4 className="font-display font-bold text-xl mb-2">Did you know?</h4>
            <p className="text-blue-50 text-sm leading-relaxed">
              The highest temperature ever recorded on Earth was 56.7°C (134°F) in Furnace Creek, Death Valley, California on July 10, 1913.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}
