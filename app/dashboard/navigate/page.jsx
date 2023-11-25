"use client";
import L from 'leaflet';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import MarkerIcon from '.././../../node_modules/leaflet/dist/images/marker-icon.png';
import MarkerShadow from '.././../../node_modules/leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

export default function Page() {
  const [viewport, setViewport] = useState({
    latitude: 28.6448,
    longitude: 77.216,
    zoom: 10,
  });

  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const setParams = useSearchParams();
  const lat = setParams.get('lat');
  const lag = setParams.get('lag');
  const id = setParams.get('id');
  const name = setParams.get('name');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation({ latitude, longitude });
          setViewport((prevViewport) => ({
            ...prevViewport,
            latitude,
            longitude,
          }));
        },
        (error) => {
          console.error('Error getting geolocation:', error);
          setError('Error getting geolocation. Please allow location access.');
        }
      );
    } else {
      setError('Geolocation is not supported in this browser.');
    }
  }, []);

  useEffect(() => {
    console.log('Mapbox Access Token:', process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN);
  }, []); // Log the Mapbox Access Token

  useEffect(() => {
    // Log the viewport whenever it changes
    console.log('Viewport:', viewport);
  }, [viewport]);

  const Routing = () => {
    const map = useMap();

    useEffect(() => {
      if (location && lat && lag) {
        L.Routing.control({
          waypoints: [
            L.latLng(location.latitude, location.longitude),
            L.latLng(lat, lag),
          ],
        }).addTo(map);
      }
    }, [location, lat, lag, map]);

    return null;
  };

  return (
    <div className="mt-12">
      <MapContainer
        style={{
          height: '100vh',
          width: '100vw',
        }}
        center={[lat, lag]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Users */}
        {error && <p>{error}</p>}
        {location && (
          <Marker
            icon={
              new L.Icon({
                iconUrl: MarkerIcon.src,
                iconRetinaUrl: MarkerIcon.src,
                iconSize: [25, 41],
                iconAnchor: [12.5, 41],
                popupAnchor: [0, -41],
                shadowUrl: MarkerShadow.src,
                shadowSize: [41, 41],
              })
            }
            position={[location.latitude, location.longitude]}
          >
            <Popup>User</Popup>
          </Marker>
        )}

        {/* Mechanic */}
        <Marker
          icon={
            new L.Icon({
              iconUrl: MarkerIcon.src,
              iconRetinaUrl: MarkerIcon.src,
              iconSize: [25, 41],
              iconAnchor: [12.5, 41],
              popupAnchor: [0, -41],
              shadowUrl: MarkerShadow.src,
              shadowSize: [41, 41],
            })
          }
          position={[lat, lag]}
        >
          <Popup>Mechanic</Popup>
        </Marker>

        {/* Routes */}
        <Routing />
      </MapContainer>
    </div>
  );
}
