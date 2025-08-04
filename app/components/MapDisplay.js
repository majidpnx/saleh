'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';

// آیکون پیش‌فرض Marker رو اصلاح می‌کنیم چون در Next.js نمیاد
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
  iconUrl: '/leaflet/images/marker-icon.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
});

export default function MapDisplay() {
  const [coords, setCoords] = useState(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("مرورگر از Geolocation پشتیبانی نمی‌کند.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
      },
      () => alert("دریافت موقعیت ناموفق بود.")
    );
  };

  return (
    <div className="my-6 space-y-4 text-center">
      <button
        onClick={handleGetLocation}
        className="bg-primary text-white px-5 py-2 rounded hover:bg-primary/90 transition"
      >
        نمایش موقعیت من روی نقشه
      </button>

      {coords && (
        <MapContainer
          center={[coords.lat, coords.lng]}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[coords.lat, coords.lng]}>
            <Popup>شما اینجا هستید!</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}
