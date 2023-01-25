import React, { useMemo } from "react";
import { Customer } from "../interfaces/record";
import {
  calculateArrivalsFromInterArrivals,
  generateRandomExponential,
  generateServiceTimes,
  serviceTimes as orignalServiceTime,
  calculateInterArrivalTimes,
  arrivalTimes as orignalArivalTimes,
} from "../utils/common";
import { mmc_calculation } from "../utils/MMC";

interface IAppContex {
  numberOfCustomers: number;
  speed: number;
  numberOfServers: number;
  customerRecords: Customer[];
  setNumberOfCustomers: (value: number) => void;
  setSpeed: (value: number) => void;
  setNumberOfServers: (value: number) => void;
  setCustomerRecords: (value: Customer[]) => void;
  generateArrivals: () => void;
  performanceMeasures: ReturnType<typeof mmc_calculation>;
}

export const AppContext = React.createContext<IAppContex>({} as IAppContex);

interface Props {
  children: React.ReactNode;
}

// const MeanInterArival = 12;
// const MeanServiceTime = 15;
const MeanInterArival = 4.75;
const MeanServiceTime = 5.4;

const AppProvider: React.FC<Props> = ({ children }) => {
  const [numberOfCustomers, setNumberOfCustomers] = React.useState(1);
  const [speed, setSpeed] = React.useState(1);
  const [numberOfServers, setNumberOfServers] = React.useState(1);
  const [customerRecords, setCustomerRecords] = React.useState<Customer[]>([]);

  const lamda = useMemo(() => 1 / MeanInterArival, []);
  const meu = useMemo(() => 1 / MeanServiceTime, []);
  const p = useMemo(() => lamda / (numberOfServers * meu), [meu, numberOfServers, lamda]);
  const performanceMeasures = useMemo(
    () => mmc_calculation(p, lamda, meu, numberOfServers),
    [p, lamda, meu, numberOfServers]
  );

  const generate = (interArrivals: number[], serviceTimes: number[]) => {
    const arrivals = calculateArrivalsFromInterArrivals(interArrivals);
    const servers = new Array(numberOfServers).fill(0);
    const customers: Customer[] = [];

    arrivals.forEach((_, i) => {
      let serverNum = 0;
      for (let index = 0; index < servers.length; index++) {
        if (servers[index] > servers[index + 1]) {
          serverNum = index + 1;
        }
      }
      // [0,0]
      let startTime = arrivals[i] < servers[serverNum] ? servers[serverNum] : arrivals[i];
      let endTime = startTime + serviceTimes[i];
      let arrival = arrivals[i];
      let waitTime = startTime - arrival;
      let turnaroundTime = endTime - arrival;
      let obj: Customer = {
        arrival,
        interArrival: interArrivals[i],
        serviceTime: serviceTimes[i],
        server: serverNum + 1,
        startTime,
        endTime,
        waitTime,
        turnaroundTime,
      };
      servers[serverNum] += serviceTimes[i];
      customers.push(obj);
    });
    setCustomerRecords(customers);
  };

  const generateArrivals = () => {
    // const serviceTimes = generateServiceTimes(numberOfCustomers);
    // const interArrivals = generateServiceTimes(numberOfCustomers);

    const serviceTimes: number[] = [];
    const interArrivals: number[] = [];
    for (let i = 0; i < numberOfCustomers; i++) {
      interArrivals.push(generateRandomExponential(MeanInterArival));
      serviceTimes.push(generateRandomExponential(MeanServiceTime));
    }

    // const serviceTimes = orignalServiceTime;
    // const interArrivals = calculateInterArrivalTimes(orignalArivalTimes);

    interArrivals[0] = 0;
    generate(interArrivals, serviceTimes);
  };

  return (
    <AppContext.Provider
      value={{
        numberOfCustomers,
        setNumberOfCustomers,
        speed,
        setSpeed,
        numberOfServers,
        setNumberOfServers,
        setCustomerRecords,
        customerRecords,
        generateArrivals,
        performanceMeasures,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
