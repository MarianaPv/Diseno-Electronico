import React, { Component, useState, useEffect, useRef } from "react";
import "./App.css";
import L from "leaflet";
import userLocation from "./marker.png";
import { Map, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import Navigation from "./Components/Navigation/Navigation.js";
import Welcome from "./Components/Welcome/Welcome.js";

function App() {
  const [message, setMessage] = useState(
    ">REV002096113686+1101831-0748084000022732;ID=SyrusG4<"
  );

  const [historic, setHistoric] = useState([]);
  const [zoom, setZoom] = useState(15);
  const [color, setColor] = useState("black");
  const [dateNow, setDateNow] = useState(new Date(Date.now()).getTime());
  const [welcomeParty, setWelcomeParty] = useState(true);

  useEffect(() => {
    getInfo();
    const timer = setInterval(() => {
      getInfo();
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    setColor(color === "blue" ? "black" : "red");
    console.log(historic);
  }, [historic]);

  const getInfo = () => {
    fetch("http://ec2-54-172-1-171.compute-1.amazonaws.com:5000/coords")
      .then((res) => res.json())
      .then((data) => {
        let { data1 } = data;

        if (historic.toString() !== data1.toString()) {
          setHistoric(data1);
        }
      })
      .catch((err) => console.log(err));
  };
  const welcomeChange = () => {
    setWelcomeParty(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vw",
        overflowY: "hidden",
      }}
    >
      <div style={{ filter: welcomeParty ? "blur(1.5px)" : "blur(0px)" }}>
        <Navigation />
      </div>
      {welcomeParty && <Welcome welcomeChange={welcomeChange} />}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          filter: welcomeParty ? "blur(1.6px)" : "blur(0px)",
          backgroundColor: "rgb(224, 229, 240)",
        }}
      >
        <div className="claseUno">
          <div
            style={{ color: "black", fontWeight: "bolder", fontSize: "20px" }}
          >
            Los datos actuales de tu producto son:
          </div>
          <table className="tableClosed">
            <tr>
              <th>Latitud</th>
              <th>Longitud</th>
              <th>Fecha y Hora</th>
            </tr>
            <tr>
              <td>
                {historic.length > 0 && historic[historic.length - 1].latitud}
              </td>
              <td>
                {historic.length > 0 && historic[historic.length - 1].longitud}
              </td>
              <td>
                {historic.length > 0 && historic[historic.length - 1].date}
              </td>
            </tr>
          </table>
        </div>
        <div className="dive1">
          <Map
            className="map"
            center={[
              historic.length > 0 && historic[historic.length - 1].latitud,
              historic.length > 0 && historic[historic.length - 1].longitud,
            ]}
            zoom={zoom}
            onZoomEnd={(e) => {
              setZoom(e.target._zoom);
            }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[
                historic.length > 0 && historic[historic.length - 1].latitud,
                historic.length > 0 && historic[historic.length - 1].longitud,
              ]}
              icon={L.icon({
                iconUrl: userLocation,
                iconSize: [40, 40],
              })}
            >
              <Polyline
                positions={
                  historic.length > 0 && [
                    historic
                      .filter((ele) => dateNow < new Date(ele.date).getTime())
                      .map((ele) => {
                        return [ele.latitud, ele.longitud];
                      }),
                  ]
                }
              />
              <Popup>
                Latitud:{" "}
                {historic.length > 0 && historic[historic.length - 1].latitud}{" "}
                <br /> Longitud:{" "}
                {historic.length > 0 && historic[historic.length - 1].longitud}
              </Popup>
            </Marker>
          </Map>
        </div>
      </div>
    </div>
  );
}

export default App;
