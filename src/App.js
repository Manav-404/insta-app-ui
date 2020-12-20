import React from "react";
import "./App.css";
import Authentication from "./components/Authentication/Authentication";
import { Redirect } from "react-router-dom";

function App() {
  return <Redirect to="/authenticate" />;
}

export default App;
