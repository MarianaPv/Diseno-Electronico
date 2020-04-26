import React, { useState } from "react";
import Calendar from "react-calendar";
import TimePicker from "rc-time-picker";
import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import FilterC from "./FilterC.css";
import DatePicker from "react-datepicker";

const FiltroC = ({
  filterNow,
  handleFilter,
  dateOutput,
  dateOutput1,
  timeOutput,
  timeOutput1,
  ...props
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDatePicker = (date) => {
    setStartDate(date);
    dateOutput(date);
  };
  const handleDatePicker1 = (date) => {
    setEndDate(date);
    dateOutput1(date);
  };
  return (
    <div style={{ display: "flex", height: "15vh" }}>
      <div className="columnFilter1">
        <div>Fecha Inicial:</div>
        <DatePicker
          selected={startDate}
          onChange={handleDatePicker}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
      <div className="columnFilter1">
        <div>Fecha Final:</div>
        <DatePicker
          selected={endDate}
          onChange={handleDatePicker1}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
      <div className="columnFilter1" style={{ margin: "0px" }}>
        <button
          className="butClass"
          style={{ height: "7vh" }}
          onClick={() => handleFilter()}
        >
          Filtrar
        </button>
      </div>
    </div>
  );
};

export default FiltroC;
