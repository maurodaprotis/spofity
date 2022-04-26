import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";

function App() {
  const code = new URLSearchParams(window.location.search).get("code");

  return (
    <div className="App">{code ? <Dashboard code={code} /> : <Login />}</div>
  );
}

export default App;
