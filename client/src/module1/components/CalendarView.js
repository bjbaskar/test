import React, { useState } from "react";
import { DatePicker } from "@material-ui/pickers";

const CalendarView = props => {
  const [date, changeDate] = useState(new Date());
  const renderData = props.data;
  // prettier-ignore
  return (
    <div style={{paddingLeft: 12}}>
      <DatePicker
        autoOk
        orientation="landscape"
        variant="static"
        openTo="date"
        value={renderData} 
      />
    </div>
  );
};

export default CalendarView;
