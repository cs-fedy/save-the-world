import React from "react";
import Home from "./components/Home";
import AddLogForm from "./components/AddLogForm";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import CustomNavbar from "./components/CustomNavbar";
import { LogProvider } from "./components/LogContext";
import Map from './components/Map';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Container>
          <LogProvider>
            <CustomNavbar />
          </LogProvider>
        </Container>
        <Route path="/" exact component={Home} />
        <Route path="/map" component={Map} />
        <Route path="/addLogForm" component={AddLogForm} />
      </Router>
    </div>
  );
};

export default App;
