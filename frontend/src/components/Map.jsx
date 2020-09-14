import React, { useContext } from "react";
import { LogContext } from "./LogContext";
import ReactMapGL from "react-map-gl";

const Map = () => {
  const { viewport, setViewport } = useContext(LogContext);
  const TOKEN = "pk.eyJ1IjoiZmVkaTAxIiwiYSI6ImNrZjJyNWN2aDA1ODUyc2syejZweTliY2cifQ.ldSDAXVejMFdccsUL_oIwQ";
  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      />
    </div>
  );
};

export default Map;
