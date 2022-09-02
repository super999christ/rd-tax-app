import React from "react";

import logo from "./logo.svg";
import "./App.css";
import Main from "./Components/Main/Main";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Main />
    </div>
  );
}

export default App;
