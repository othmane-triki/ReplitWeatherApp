import { locations, type InsertLocation, type Location } from "@shared/schema";

export interface IStorage {
  getLocations(): Promise<Location[]>;
  createLocation(location: InsertLocation): Promise<Location>;
  deleteLocation(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private locations: Map<number, Location>;
  private currentId: number;

  constructor() {
    this.locations = new Map();
    this.currentId = 1;
  }

  async getLocations(): Promise<Location[]> {
    return Array.from(this.locations.values());
  }

  async createLocation(insertLocation: InsertLocation): Promise<Location> {
    const id = this.currentId++;
    const location: Location = { ...insertLocation, id };
    this.locations.set(id, location);
    return location;
  }

  async deleteLocation(id: number): Promise<void> {
    this.locations.delete(id);
  }
}

export const storage = new MemStorage();