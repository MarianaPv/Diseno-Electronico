import React, { useEffect, useState, useRef } from "react";
import Navigation from "../Navigation/Navigation.js";
import FilterC from "../Calendario/FilterC.js";

import "rc-time-picker/assets/index.css";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";

import { Map, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "./Historicos.css";
import userLocation from "../../marker.png";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

function Historicos() {
  const [lowerDateRange, setLowerDateRange] = useState(new Date());
  const [upperDateRange, setUpperDateRange] = useState(new Date());

  const [historic, setHistoric] = useState([]);
  const [filterHistoric, setFilterHistoric] = useState([]);
  const [zoom, setZoom] = useState(15);
  const [valueSlider, setValueSlider] = useState(0);

  useEffect(() => {
    getInfo();
  }, []);
  useEffect(() => {
    console.log(filterHistoric);
  }, [filterHistoric]);
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

  const handleFilter = () => {
    if (lowerDateRange < upperDateRange) {
      let arrayDate = historic.filter((ele) => {
        return (
          new Date(ele.date).getTime() >= lowerDateRange &&
          new Date(ele.date).getTime() <= upperDateRange
        );
      });

      setFilterHistoric(arrayDate);
    } else {
      alert("¡La fecha inicial tiene que ser menor que la final!");
    }
  };

  const dateOutput = (date) => {
    setLowerDateRange(new Date(date).getTime() - 5 * 60 * 60 * 1000);
  };

  const dateOutput1 = (date) => {
    setUpperDateRange(new Date(date).getTime() - 5 * 60 * 60 * 1000);
  };

  const valueText = (value) => {
    setValueSlider(value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "87vh",
        width: "100vw",
      }}
    >
      <Navigation />
      <div className="dive" style={{ backgroundColor: "rgb(224, 229, 240)" }}>
        <FilterC
          dateOutput={dateOutput}
          dateOutput1={dateOutput1}
          handleFilter={handleFilter}
        />
        <div
          style={{
            display: "flex",
            height: "87vh",
            flexDirection: "column",
            marginLeft: "9vw",
          }}
        >
          <Map
            className="map1"
            center={
              filterHistoric.length > 0 && filterHistoric[valueSlider]
                ? [
                    filterHistoric[valueSlider].latitud,
                    filterHistoric[valueSlider].longitud,
                  ]
                : [11.01931, -74.8084]
            }
            onZoomEnd={(e) => {
              setZoom(e.target._zoom);
            }}
            zoom={zoom}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={
                filterHistoric.length > 0 && filterHistoric[valueSlider]
                  ? [
                      filterHistoric[valueSlider].latitud,

                      filterHistoric[valueSlider].longitud,
                    ]
                  : [20, 20]
              }
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
          <div style={{ textAlign: "center" }}>
            Desliza para conocer más detalles de tu ubicación.
          </div>
          <Slider
            defaultValue={0}
            getAriaValueText={valueText}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={filterHistoric.length > 0 ? filterHistoric.length - 1 : 1}
          />

          <div style={{ textAlign: "center" }}>
            {filterHistoric.length > 0 &&
              filterHistoric[valueSlider] &&
              filterHistoric[valueSlider].date.slice(
                0,
                filterHistoric[valueSlider].date.search("G")
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Historicos;
