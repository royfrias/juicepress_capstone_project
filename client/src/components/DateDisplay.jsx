import React from 'react';
import { format } from 'date-fns';

const DateDisplay = () => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'MMMM dd, yyyy');

  return (
    <div className="date-display">
      <p>Today's date is: {formattedDate}</p>
    </div>
  );
};

export default DateDisplay;
