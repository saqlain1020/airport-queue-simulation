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
  serviceTimes, 
  arrivalTimes,
  calculateInterArrivalTimes,
  calculateAverage,
  calculateStandardDeviation,
  generateRandomExponential
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
  console.log("Rand:",generateRandomExponential(2.45))

  //start from here
  const interArrivals = calculateInterArrivalTimes(arrivalTimes);
  const oldMean = calculateAverage(interArrivals);
  const oldSD = calculateStandardDeviation(interArrivals);

  let newMean = 330;
  //calculte standard deviation from new mean
  const newSD = calculateStandardDeviation(interArrivals, newMean);


  console.log('old M S',oldMean, oldSD);
  console.log('new M S',newMean, newSD);
  
  let newInterArrivals = [];
  for(let i = 0; i < 20; i++) {
    newInterArrivals.push(newSD * (interArrivals[i] - oldMean) / oldSD + newMean);
  }
  let interArrivalinMinutes = interArrivals.map((item => item/60))
  let newInterArrivalsinMinutes = newInterArrivals.map((item => item/60))
  
  console.log('====================================');
  console.log(interArrivalinMinutes)
  console.log(newInterArrivalsinMinutes)
  console.log(calculateAverage(newInterArrivals));
  console.log('====================================');
  //end here

  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

export default App;

