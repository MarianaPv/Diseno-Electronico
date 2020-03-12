import React, { Component, useState, useEffect } from "react";
import "./App.css";
import L from "leaflet";
import userLocation from "./marker.png";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

function App() {
  const [message, setMessage] = useState(
    ">REV002096113686+1101831-0748084000022732;ID=SyrusG4<"
  );
  const [date, setDate] = useState("");

  const [color, setColor] = useState("black");
  const plusSign = message.indexOf("+");
  const minusSign = message.indexOf("-");
  const latitud =
    message.substring(plusSign + 1, plusSign + 3) +
    "." +
    message.substring(plusSign + 3, plusSign + 8);
  const longitud =
    "-" +
    message.substring(minusSign + 2, minusSign + 4) +
    "." +
    message.substring(minusSign + 4, minusSign + 9);

  const decomposeTime = dummy => {
    const janTimeMilli = new Date("January 5, 1980 19:00:00").getTime();
    const numWeeks = parseInt(dummy.substring(6, 10));
    const numSeconds = parseInt(dummy.substring(11, 16));
    const numWeeksMilli = numWeeks * 7 * 24 * 60 * 60 * 1000;
    const dateWeek = parseInt(dummy.substring(10, 11)) * 24 * 60 * 60 * 1000;
    const time = numSeconds * 1000 + numWeeksMilli + janTimeMilli + dateWeek;
    const time1 = new Date(time).toString();
    setDate(time1);
  };

  useEffect(() => {
    getInfo();
    setInterval(() => {
      getInfo();
    }, 10000);
  }, []);

  useEffect(() => {
    setColor(color === "blue" ? "black" : "blue");
    decomposeTime(message); // cambiar a message
  }, [message]);

  const getInfo = () => {
    fetch("http://bdd24ce8.ngrok.io/coords")
      .then(res => res.json())
      .then(data => {
        if (message !== data) {
          setMessage(data);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vw" }}>
      <div style={{ color: color, fontWeight: "bolder" }}>{message}</div>
      <div style={{ color: color, fontWeight: "bolder" }}>
        Latitud: {latitud}
      </div>
      <div style={{ color: color, fontWeight: "bolder" }}>
        Longitud: {longitud}
      </div>
      <div style={{ color: color, fontWeight: "bolder" }}>
        Fecha y Hora: {date}
      </div>
      <div className="dive">
        <Map className="map" center={[latitud, longitud]}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[latitud, longitud]}
            icon={L.icon({
              iconUrl: userLocation,
              iconSize: [40, 40]
            })}
          >
            <Popup>
              Latitud: {latitud} <br /> Longitud: {longitud}
            </Popup>
          </Marker>
        </Map>
      </div>
    </div>
  );
}

export default App;
