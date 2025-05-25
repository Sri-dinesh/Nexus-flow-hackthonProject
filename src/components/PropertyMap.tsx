import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { MapPin, Search, User, ZoomIn, ZoomOut } from "lucide-react";
import { Property } from "@/types/property";

type PropertyMapProps = {
  properties: Property[];
  onPropertySelect?: (property: Property) => void;
  className?: string;
  darkMode?: boolean;
  centerLocation?: [number, number]; // [lat, lng]
};

const PropertyMap = ({
  properties,
  onPropertySelect,
  className = "",
  darkMode = false,
  centerLocation,
}: PropertyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersLayer = useRef<L.LayerGroup | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // MapTiler API key - this should be moved to an environment variable in production
  const mapTilerKey = import.meta.env.VITE_MAPTILER_API_KEY;

  // Default center if not provided (New York)
  const defaultCenter: [number, number] = [40.7128, -74.006];

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Initialize the map
    mapInstance.current = L.map(mapRef.current).setView(
      centerLocation || defaultCenter,
      10
    );

    // Add MapTiler base layer
    const tileLayer = L.tileLayer(
      `https://api.maptiler.com/maps/${
        darkMode ? "dark-matter" : "streets"
      }/{z}/{x}/{y}.png?key=${mapTilerKey}`,
      {
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        attribution:
          '© <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>',
        crossOrigin: true,
      }
    );

    tileLayer.addTo(mapInstance.current);

    // Add markers layer
    markersLayer.current = L.layerGroup().addTo(mapInstance.current);

    // Add properties markers
    addPropertyMarkers();

    // Add zoom controls
    const zoomControl = L.control.zoom({
      position: "topright",
    });
    zoomControl.addTo(mapInstance.current);

    // Cleanup on unmount
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [darkMode]);

  // Update markers when properties change
  useEffect(() => {
    if (mapInstance.current && markersLayer.current) {
      addPropertyMarkers();
    }
  }, [properties]);

  // Update map center when centerLocation changes
  useEffect(() => {
    if (mapInstance.current && centerLocation) {
      mapInstance.current.setView(centerLocation, 12);
    }
  }, [centerLocation]);

  const addPropertyMarkers = () => {
    if (!mapInstance.current || !markersLayer.current) return;

    // Clear existing markers
    markersLayer.current.clearLayers();

    // Add new markers
    properties.forEach((property) => {
      // Check if property has location coordinates
      const lat = property.location?.latitude;
      const lng = property.location?.longitude;

      if (!lat || !lng) return;

      const marker = L.marker([lat, lng], {
        icon: L.icon({
          iconUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      });

      // Add popup with property details
      marker.bindPopup(`
        <div class="p-1">
          <h3 class="font-bold">${property.title}</h3>
          <p>${property.location.address}, ${property.location.city}</p>
          <p class="font-bold">${new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(property.price)}</p>
        </div>
      `);

      // Add click handler
      marker.on("click", () => {
        if (onPropertySelect) {
          onPropertySelect(property);
        }
      });

      marker.addTo(markersLayer.current!);
    });

    // If no center was specified and we have properties with coordinates, fit bounds
    if (!centerLocation && properties.length > 0) {
      const validLocations = properties
        .filter((p) => p.location?.latitude && p.location?.longitude)
        .map(
          (p) =>
            [p.location!.latitude!, p.location!.longitude!] as [number, number]
        );

      if (validLocations.length > 0) {
        mapInstance.current.fitBounds(validLocations);
      }
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);

    try {
      // This would normally use a geocoding API like MapTiler's Geocoding API
      const response = await fetch(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(
          searchQuery
        )}.json?key=${mapTilerKey}`
      );

      if (!response.ok) {
        throw new Error("Geocoding API error");
      }

      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;

        if (mapInstance.current) {
          mapInstance.current.setView([latitude, longitude], 12);

          // Add a marker for the searched location
          if (markersLayer.current) {
            const searchMarker = L.marker([latitude, longitude], {
              icon: L.icon({
                iconUrl:
                  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                iconRetinaUrl:
                  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
                shadowUrl:
                  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
              }),
            });

            searchMarker.bindPopup(
              `<div class="p-1"><strong>${searchQuery}</strong></div>`
            );
            searchMarker.addTo(markersLayer.current);
          }
        }
      } else {
        toast.error("Location not found. Please try a different search.");
      }
    } catch (error) {
      console.error("Error searching for location:", error);
      toast.error("Error searching for location. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (mapInstance.current) {
          mapInstance.current.setView([latitude, longitude], 13);

          // Add a marker for the current location
          if (markersLayer.current) {
            const currentLocationMarker = L.marker([latitude, longitude], {
              icon: L.icon({
                iconUrl:
                  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                iconRetinaUrl:
                  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
                shadowUrl:
                  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
              }),
            });

            currentLocationMarker.bindPopup(
              "<div class='p-1'><strong>Your Location</strong></div>"
            );
            currentLocationMarker.addTo(markersLayer.current);
          }
        }

        setIsLoading(false);
        toast.success("Map centered to your current location");
      },
      () => {
        setIsLoading(false);
        toast.error("Unable to retrieve your location");
      }
    );
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <form
          onSubmit={handleSearch}
          className="flex-1 flex gap-2">
          <Input
            type="text"
            placeholder="Search for a location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-shrink-0">
            <Search className="h-4 w-4 mr-1" />
            Search
          </Button>
        </form>
        <Button
          type="button"
          variant="outline"
          onClick={handleUseCurrentLocation}
          disabled={isLoading}
          className="flex-shrink-0">
          <MapPin className="h-4 w-4 mr-1" />
          My Location
        </Button>
      </div>

      <div
        ref={mapRef}
        className={`h-[500px] rounded-lg border border-gray-200 overflow-hidden ${className}`}
      />
    </div>
  );
};

export default PropertyMap;
