export type GeoHit = {
    name: string;
    city: string;
    place: String;
    country: String;
    categories: string[];
    services: string[];
    objectID: string
    _geoloc: { lat: number; lng: number };
  };