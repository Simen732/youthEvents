import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import Leaflet's default marker assets
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

export default function MapFrame({ eventLocation }) {
  const [map, setMap] = useState(null);
  const [coords, setCoords] = useState(null);

  // Fix Leaflet's default marker icon issue
  const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  // Fetch coordinates using OpenStreetMap's Nominatim API
  useEffect(() => {
    const fetchCoordinates = async () => {
      const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        eventLocation
      )}&format=json&limit=1`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.length > 0) {
          setCoords({ lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) });
        } else {
          console.error("Address not found.");
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [eventLocation]);

  // Initialize the Leaflet map when coordinates are available
  useEffect(() => {
    if (coords && !map) {
      const leafletMap = L.map("map").setView([coords.lat, coords.lon], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(leafletMap);

      // Add a marker to the map
      L.marker([coords.lat, coords.lon]).addTo(leafletMap);

      setMap(leafletMap);
    }
  }, [coords, map]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">{eventLocation}</h2>
      <div id="map" className="z-10 w-full h-96 rounded-lg overflow-hidden shadow-lg"></div>
    </div>
  );
}