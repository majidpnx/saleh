"use client"
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// اصلاح مسیر آیکون‌ها برای Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
function ChangeView({ center }) {
  const map = useMap();
  if (center) {
    map.setView(center, 13);
  }
  return null;
}

export default function LocationButton({ onLocationSelect }) {
  const [location, setLocation] = useState(null);
  const defaultPosition = [35.6892, 51.3890]; // تهران

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation پشتیبانی نمی‌شود");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
          const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
         onLocationSelect(coords);
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => alert("دریافت موقعیت ناموفق بود")
    );
  };

  return (
    <div>
      <button
        onClick={handleGetLocation}
        className="bg-primary text-white px-4 py-2 rounded mb-4"
      >
        دریافت موقعیت شما
      </button>

      <h1 className="text-xl font-bold mb-4">نمایش موقعیت شما</h1>

      <MapContainer
        center={location ? [location.lat, location.lng] : defaultPosition}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location && (
          <>
            <Marker position={[location.lat, location.lng]}>
              <Popup>موقعیت شما</Popup>
            </Marker>
            <ChangeView center={[location.lat, location.lng]} />
          </>
        )}
      </MapContainer>
    </div>
  );
}
