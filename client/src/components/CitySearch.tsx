import { useState, useRef, useEffect } from "react";
import { Search, Loader2, MapPin } from "lucide-react";
import { useCitySearch } from "@/hooks/use-weather";
import { useDebounce } from "@/hooks/use-debounce"; // We'll assume a standard debounce hook or implement inline

function useDebounceValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

interface CitySearchProps {
  onSelect: (city: { name: string; lat: number; lon: number }) => void;
}

export function CitySearch({ onSelect }: CitySearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const debouncedQuery = useDebounceValue(query, 500);
  const { data: results, isLoading } = useCitySearch(debouncedQuery);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (city: any) => {
    onSelect({
      name: `${city.name}${city.admin1 ? `, ${city.admin1}` : ''}, ${city.country || ''}`,
      lat: city.latitude,
      lon: city.longitude
    });
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search city..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/80 border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/60"
        />
        {isLoading && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {isOpen && results && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-md rounded-xl border border-border shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="py-1">
            {results.map((city) => (
              <li key={city.id}>
                <button
                  onClick={() => handleSelect(city)}
                  className="w-full px-4 py-3 text-left hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-3 group"
                >
                  <div className="p-2 bg-muted rounded-full group-hover:bg-primary/10 transition-colors">
                    <MapPin className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      {city.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
