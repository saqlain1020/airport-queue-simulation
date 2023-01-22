import React from "react";
import { Customer } from "../interfaces/record";
import { calculateArrivalsFromInterArrivals, generateServiceTimes } from "../utils/common";

export const AppContext = React.createContext({
  numberOfCustomers: 1,
  speed: 1,
  numberOfServers: 1,
  customerRecords: [] as Customer[],
  setNumberOfCustomers: (value: number) => {},
  setSpeed: (value: number) => {},
  setNumberOfServers: (value: number) => {},
  setCustomerRecords: (value: Customer[]) => {},
  generateArrivals: () => {},
});

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
  const [numberOfCustomers, setNumberOfCustomers] = React.useState(1);
  const [speed, setSpeed] = React.useState(1);
  const [numberOfServers, setNumberOfServers] = React.useState(1);
  const [customerRecords, setCustomerRecords] = React.useState<Customer[]>([]);

  const generate = (interArrivals: number[], serviceTimes: number[]) => {
    const arrivals = calculateArrivalsFromInterArrivals(interArrivals);
    console.log("interArrivals", interArrivals);
    console.log("arrivals", arrivals);
    const servers = new Array(numberOfServers).fill(0);

    const customers: Customer[] = [];

    arrivals.forEach((_, i) => {
      let serverNum = 0;
      for (let index = 0; index < servers.length - 1; index++) {
        if (servers[index] > servers[index + 1]) {
          serverNum = index + 1;
        }
      }
      let startTime = arrivals[i] < servers[serverNum] ? servers[serverNum] : arrivals[i];
      let endTime = startTime + serviceTimes[i];
      let arrival = arrivals[i];
      let waitTime = startTime - arrival;
      let obj: Customer = {
        arrival,
        interArrival: interArrivals[i],
        serviceTime: serviceTimes[i],
        server: serverNum,
        startTime,
        endTime,
        waitTime,
      };
      servers[serverNum] += serviceTimes[i];
      customers.push(obj);
    });
    console.table(customers);
    setCustomerRecords(customers);
  };

  const generateArrivals = () => {
    const serviceTimes = generateServiceTimes(numberOfCustomers);
    const interArrivals = generateServiceTimes(numberOfCustomers);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
