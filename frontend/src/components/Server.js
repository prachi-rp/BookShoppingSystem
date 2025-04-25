import React, { useEffect, useState } from 'react';

const apiURL = 'http://localhost:5104/api/myapi/getdata/';

export default function Server() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(apiURL)
     .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log("Fetched data:", data); // Log the data to see if it's being fetched
      setMessage(data.message);
    })
    .catch(error => console.error('Error:', error));
  }, []);

  return (
    <>
      <h1>{message}</h1>
    </>
  );
}
