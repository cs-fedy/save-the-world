import React, { useContext } from "react";
import { LogContext } from "./LogContext";
import ReactMapGL from "react-map-gl";

const Map = () => {
  const { viewport, setViewport } = useContext(LogContext);
  console.log(viewport);
  const TOKEN = "react-map-gl-token";
  return (
    <div className="mt-3">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        onViewportChange={nextViewport => setViewport(nextViewport)}
      />
    </div>
  );
};

export default Map;
