import { useSavedLocations, useDeleteLocation } from "@/hooks/use-weather";
import { Trash2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SavedLocationsProps {
  onSelect: (location: { name: string; lat: number; lon: number }) => void;
  currentLat?: number;
  currentLon?: number;
}

export function SavedLocations({ onSelect, currentLat, currentLon }: SavedLocationsProps) {
  const { data: locations, isLoading } = useSavedLocations();
  const deleteLocation = useDeleteLocation();

  if (isLoading) return <div className="h-20 animate-pulse bg-muted rounded-xl" />;
  
  if (!locations || locations.length === 0) {
    return (
      <div className="text-center p-8 bg-white/40 rounded-xl border border-dashed border-border/60">
        <p className="text-muted-foreground text-sm">No saved locations yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
        <span className="w-1 h-6 bg-accent rounded-full block"></span>
        Saved Locations
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        {locations.map((loc) => {
          const isActive = currentLat === loc.lat && currentLon === loc.lon;
          
          return (
            <Card 
              key={loc.id}
              className={`
                group flex items-center justify-between p-3 transition-all duration-200 border-0 shadow-sm
                ${isActive 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                  : 'bg-white/60 hover:bg-white/80 text-foreground'
                }
              `}
            >
              <button 
                onClick={() => onSelect(loc)}
                className="flex items-center gap-3 flex-1 min-w-0"
              >
                <div className={`
                  p-2 rounded-lg transition-colors
                  ${isActive ? 'bg-white/20' : 'bg-muted group-hover:bg-primary/10'}
                `}>
                  <MapPin className={`w-4 h-4 ${isActive ? 'text-white' : 'text-muted-foreground group-hover:text-primary'}`} />
                </div>
                <span className="font-medium truncate">{loc.name}</span>
              </button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteLocation.mutate(loc.id);
                }}
                className={`
                  h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity
                  ${isActive ? 'text-white hover:bg-white/20' : 'text-muted-foreground hover:text-destructive hover:bg-destructive/10'}
                `}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
