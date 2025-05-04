import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Calender = ({ selectedDate, setSelectedDate }) => {
  const handleDateChages = (newDate) => {
    setSelectedDate(newDate);
  };
  return (
    <>
      {" "}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          onChange={handleDateChages}
          value={selectedDate}
          sx={{ width: 380, height:300,  alignSelf: "flex-start",margin: 0, }}
          className="bg-white  text-gray-800  shadow-[0_3px_10px_rgb(0,0,0,0.4)] rounded-xl "
         
        />
      </LocalizationProvider>
    </>
  );
};

export default Calender;
