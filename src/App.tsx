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
  generateRandomExponential,
  transformInterArrivalsToExactMean,
  generateServiceTimes,
  transformServiceTimeToExactMean
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
  console.log('old acc',calcProbabilityPoisson(lambda, 2));
  console.log("Rand:",generateRandomExponential(2.45));

  let newMeu = 300;
  let newLamd = 330;
  let { newInterArrivals } = transformInterArrivalsToExactMean(arrivalTimes, newMeu);
  let randomServiceTimes = generateServiceTimes(20);

  // let {newServiceTimes, newServiceTimesInMinutes} = transformServiceTimeToExactMean(randomServiceTimes, newLamd);
  // console.log(randomServiceTimes);
  // console.log(calculateAverage(newServiceTimes));
  // console.log("newInterArrivals", newInterArrivals);
  // console.log("newServiceTimes", newServiceTimesInMinutes);

  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

export default App;

