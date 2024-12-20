import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

export default function MapFrame({ eventLocation }) {
  const [map, setMap] = useState(null);
  const [coords, setCoords] = useState(null);

  const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
  });

  L.Marker.prototype.options.icon = DefaultIcon;

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

  useEffect(() => {
    if (coords && !map) {
      const leafletMap = L.map("map").setView([coords.lat, coords.lon], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(leafletMap);

      L.marker([coords.lat, coords.lon]).addTo(leafletMap);

      setMap(leafletMap);
    }
  }, [coords, map]);

  const copyToClipboard = () => {
    const mapsLink = `https://www.google.no/maps/place/${encodeURIComponent(eventLocation)}`;
    navigator.clipboard.writeText(mapsLink).then(() => {
      alert("Google Maps link copied to clipboard!");
    });
  };

  const openInMaps = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eventLocation)}`;
    window.open(mapUrl, '_blank');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold mr-4">{eventLocation}</h2>
        <button onClick={copyToClipboard} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Copy</button>
        <button onClick={openInMaps} className="bg-green-500 text-white px-2 py-1 rounded">Open in Google Maps</button>
      </div>
      <div id="map" className="z-10 w-full h-96 rounded-lg overflow-hidden shadow-lg"></div>
    </div>
  );
}
