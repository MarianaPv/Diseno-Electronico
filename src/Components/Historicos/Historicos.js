import React, { useEffect, useState, useRef } from "react";
import Navigation from "../Navigation/Navigation.js";
import FilterC from "../Calendario/FilterC.js";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import "react-calendar/dist/Calendar.css";
import { Map, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "./Historicos.css";
import userLocation from "../../marker.png";

function Historicos() {
  const [lowerDateRange, setLowerDateRange] = useState(0);
  const [upperDateRange, setUpperDateRange] = useState(0);
  const [firstTime, setFirstTime] = useState(0);
  const [secondTime, setSecondTime] = useState(0);
  const [historic, setHistoric] = useState([]);
  const [filterHistoric, setFilterHistoric] = useState([]);

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = () => {
    fetch("http://localhost:5000/coords")
      .then((res) => res.json())
      .then((data) => {
        let { data1 } = data;

        if (historic.toString() !== data1.toString()) {
          setHistoric(data1);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleFilter = () => {
    console.log("clic");
    let arrayDate = historic.filter((ele) => {
      console.log(
        lowerDateRange + firstTime,
        upperDateRange + secondTime,
        new Date(ele.date).getTime()
      );
      return (
        new Date(ele.date).getTime() >= lowerDateRange + firstTime &&
        new Date(ele.date).getTime() <= upperDateRange + secondTime
      );
    });

    setFilterHistoric(arrayDate);
  };

  const dateOutput = (date) => {
    console.log(date);
    setLowerDateRange(new Date(date[0]).getTime());
    setUpperDateRange(new Date(date[1]).getTime());
  };

  const timeOutput = (time) => {
    let msArray = time.format("HH:mm").split(":");
    let ms = (msArray[0] * 3600 + msArray[1] * 60) * 1000;
    setFirstTime(ms);
  };

  const timeOutput1 = (time) => {
    let msArray = time.format("HH:mm").split(":");
    let ms = (msArray[0] * 3600 + msArray[1] * 60) * 1000;
    setSecondTime(ms);
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
        <FilterC
          dateOutput={dateOutput}
          timeOutput={timeOutput}
          timeOutput1={timeOutput1}
          handleFilter={handleFilter}
        />

        <Map className="map" center={[11.01931, -74.8084]} zoom={20}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[
              filterHistoric.length > 0 &&
                filterHistoric[filterHistoric.length - 1].latitud,
              filterHistoric.length > 0 &&
                filterHistoric[filterHistoric.length - 1].longitud,
            ]}
            icon={L.icon({
              iconUrl: userLocation,
              iconSize: [40, 40],
            })}
          ></Marker>
          <Polyline
            positions={
              filterHistoric.length > 0 && [
                filterHistoric.map((ele) => {
                  return [ele.latitud, ele.longitud];
                }),
              ]
            }
          />
        </Map>
      </div>
    </div>
  );
}

export default Historicos;
