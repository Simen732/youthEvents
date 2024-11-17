import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapDropdown({ address }) {
  const [mapVisible, setMapVisible] = useState(false); // State to toggle map visibility
  const [map, setMap] = useState(null);
  const [coords, setCoords] = useState(null);

  // Fetch coordinates using OpenStreetMap's Nominatim API
  useEffect(() => {
    const fetchCoordinates = async () => {
      const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        address
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
  }, [address]);

  // Initialize the Leaflet map when coordinates are available
  useEffect(() => {
    if (coords && mapVisible && !map) {
      const leafletMap = L.map("map").setView([coords.lat, coords.lon], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(leafletMap);

      // Add a marker to the map
      L.marker([coords.lat, coords.lon]).addTo(leafletMap);

      setMap(leafletMap);
    }
  }, [coords, mapVisible, map]);

  // Handle map resizing on visibility change
  useEffect(() => {
    if (mapVisible && map) {
      setTimeout(() => {
        map.invalidateSize(); // Fix the white screen issue by invalidating the size
      }, 100); // Small delay to ensure container is visible
    }
  }, [mapVisible, map]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Map for: {address}</h2>

      {/* Button to toggle the map */}
      <button
        onClick={() => setMapVisible((prev) => !prev)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none"
      >
        {mapVisible ? "Close Map" : "Open Map"}
      </button>

      {/* Map container (conditionally rendered) */}
      <div id="map" className={`w-full h-96 mt-4 rounded-lg overflow-hidden shadow-lg ${mapVisible ? "block" : "hidden"}`}></div>
    </div>
  );
}