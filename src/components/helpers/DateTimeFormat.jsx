import React from 'react';

const DateTimeFormat = ({ dateTime }) => {
  const formattedDateTime = new Date(dateTime).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    // second: 'numeric',
    hour12: true,
  });

  return (
    formattedDateTime
  );
};

export default DateTimeFormat;
