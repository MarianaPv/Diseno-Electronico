import React, { useState } from "react";
import Calendar from "react-calendar";
import TimePicker from "rc-time-picker";
import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import FilterC from "./FilterC.css";

const FiltroC = ({
  filterNow,
  handleFilter,
  dateOutput,
  timeOutput,
  timeOutput1,
  ...props
}) => {
  return (
    <div style={{ display: "flex", height: "15vh" }}>
      <div className="columnFilter">
        <Calendar selectRange onChange={dateOutput} />
      </div>

      <div className="timeFilter">
        <div>
          <TimePicker showSecond={false} onChange={timeOutput} />
        </div>
        <div>
          <TimePicker showSecond={false} onChange={timeOutput1} />
        </div>
      </div>
      <button
        className="butClass"
        style={{ height: "7vh" }}
        onClick={() => handleFilter()}
      >
        Filtrar
      </button>
    </div>
  );
};

export default FiltroC;
