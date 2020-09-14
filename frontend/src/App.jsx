import React from "react";
import { LogProvider } from "./components/LogContext";
import Map from './components/Map';

const App = () => {
  return (
    <div className="App">
      <LogProvider>
        <Map />
      </LogProvider>
    </div>
  );
};

export default App;
