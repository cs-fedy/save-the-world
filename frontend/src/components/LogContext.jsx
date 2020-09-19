import React, { createContext, useState, useEffect } from "react";

export const LogContext = createContext([]);

export const LogProvider = ({ children }) => {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [logs, setLogs] = useState([]);
  const [viewport, setViewport] = useState({
    width: 800,
    height: 450,
    latitude,
    longitude,
    zoom: 8,
  });

  const fetchData = async () => {
    const res = await fetch(apiURL);
    const { postedLogs } = await res.json();
    setLogs(postedLogs);
  };

  const apiURL = "http://localhost:5050/api/log/";
  useEffect(() => {
    navigator.geolocation.watchPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    fetchData();
  }, []);

  return (
    <LogContext.Provider value={{ viewport, setViewport }}>
      { children }
    </LogContext.Provider>
  );
};
