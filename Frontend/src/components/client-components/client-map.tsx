"use client";

import React, { useCallback, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";

interface ClientMapProps {
  position: [number, number];
  onMarkerDragEnd: (coords: [number, number]) => void;
}

const containerStyle = {
  width: "100%",
  height: "60vh",
  borderRadius: "8px",
};

const libraries: "places"[] = ["places"];

const mapApi = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API;

const ClientMap: React.FC<ClientMapProps> = ({
  position,
  onMarkerDragEnd,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${mapApi}`,
    libraries,
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral>({
      lat: position[0],
      lng: position[1],
    });

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const handleDragEnd = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();
    if (lat && lng) {
      const coords: [number, number] = [lat, lng];
      setMarkerPosition({ lat, lng });
      onMarkerDragEnd(coords);
    }
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setMarkerPosition({ lat, lng });
        onMarkerDragEnd([lat, lng]);
        mapRef.current?.panTo({ lat, lng });
      }
    }
  };

  return isLoaded ? (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          maxWidth: "500px",
        }}
      >
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            placeholder="Search by landmark, building, or address..."
            value={searchBoxValue}
            onChange={(e) => setSearchBoxValue(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </Autocomplete>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker
          position={markerPosition}
          draggable={true}
          onDragEnd={handleDragEnd}
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new window.google.maps.Size(32, 32),
          }}
        />
      </GoogleMap>
    </div>
  ) : (
    <div>Loading Map...</div>
  );
};

export default ClientMap;
