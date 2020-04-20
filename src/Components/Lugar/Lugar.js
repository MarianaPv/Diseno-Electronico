import React, { useEffect, useState, useRef } from "react";
import Navigation from "../Navigation/Navigation.js";

import { Map, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "./Lugar.css";

import userLocation from "../../marker.png";

function Lugar() {
  const [lowerCoordRange, setLowerCoordRange] = useState(0);
  const [upperCoordRange, setUpperCoordRange] = useState(0);
  const [zoom, setZoom] = useState(15);
  const [latLng, setLatLng] = useState(0);
  const [content, setContent] = useState(0);
  const [popUp, setPopUp] = useState(0);

  useEffect(() => {
    console.log(latLng);
  }, [latLng]);

  const onMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setLatLng(e.latlng);
    setPopUp(
      <Popup position={[lat, lng]}>Coordenadas:{`${lat}, ${lng}`}</Popup>
    );
  };

  const arePointsNear = (checkPoint, centerPoint, km) => {
    let ky = 40000 / 360;
    let kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
    let dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    let dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    let result = Math.sqrt(dx * dx + dy * dy) <= km;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vw",
      }}
    >
      <Navigation />
      <div className="dive">
        <Map
          className="map"
          center={[11.01931, -74.8084]}
          zoom={15}
          onClick={(e) => onMapClick(e)}
        >
          {popUp}

          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
        <button className="butClass" style={{ height: "7vh" }}>
          Filtrar
        </button>
      </div>
    </div>
  );
}
export default Lugar;
