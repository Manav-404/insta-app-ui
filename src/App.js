import React from "react";
import "./App.css";
import Authentication from "./components/Authentication/Authentication";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "./components/Authentication/helper/authenticationHelper";

function App() {
  const { user, token } = isAuthenticated();

  return !user || !token ? <Redirect to="/authenticate" />: <Redirect to="/home"/>;
}

export default App;
