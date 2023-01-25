import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AppProvider from "./context/AppContext";
import CustomDistributions from "./pages/CustomDistributions/CustomDistributions";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/custom" element={<CustomDistributions />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
