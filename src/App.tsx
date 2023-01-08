import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  calculateUtilizationOfServers,
  calculateProbabilityOfZeroCustomersInSystem,
  calcMeanNumberOfCustomersInQueue,
  caluMeanNumberOfCustomersInSystem,
  calculateMeanWaitingTimeInQueue,
  calcMeanWaitingTimeInSystem,
  calcProbabilityPoisson,
} from "./utils/common";
import Home from "./pages/Home/Home";
import AppProvider from "./context/AppContext";

function App() {
  const c = 2;
  const lambda = 1 / 5;
  const mu = 1 / 5.5;
  const p = calculateUtilizationOfServers(lambda, mu, c);
  const p0 = calculateProbabilityOfZeroCustomersInSystem(p, c);
  const lq = calcMeanNumberOfCustomersInQueue(p, p0, lambda, mu, c);
  const wq = calculateMeanWaitingTimeInQueue(lq, lambda);
  const w = calcMeanWaitingTimeInSystem(wq, mu);
  const l = caluMeanNumberOfCustomersInSystem(lambda, w);

  console.log(p, p0, lq, wq, w, l);
  console.log(calcProbabilityPoisson(lambda, 2));

  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

export default App;

