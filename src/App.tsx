import React, { useEffect, useState } from "react";
import "./App.css";
import FlavanoidsTable from "./components/FlavanoidsTable";
import GammaTable from "./components/GammaTable";
import { useAppContext } from "./context/ContextProvider";
import { IWine } from "./types";

function App() {
  const { setWineData } = useAppContext();
  useEffect(() => {
    fetch("Wine-Data.json")
      .then((res) => res.json())
      .then((data) => setWineData(data));
  }, []);

  return (
    <div className="container">
      <h1>Wine Data Visualisation</h1>
      <FlavanoidsTable />
      <GammaTable />
    </div>
  );
}

export default App;
