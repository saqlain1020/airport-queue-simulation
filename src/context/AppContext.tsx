import React, { useMemo } from "react";
import { DistributionInput } from "../interfaces";
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
  distribution: "mmc" | "ggc" | "mgc";
  setDistribution: React.Dispatch<React.SetStateAction<"mmc" | "ggc" | "mgc">>;
  distributionInput: DistributionInput;
  setDistributionInput: React.Dispatch<React.SetStateAction<DistributionInput>>;
  queueLengthServers: Customer[][];
  setQueueLengthServers: React.Dispatch<React.SetStateAction<Customer[][]>>;
  waitingInTheQueueServers: Customer[][];
  setWaitingInTheQueueServers: React.Dispatch<React.SetStateAction<Customer[][]>>;
}

export const AppContext = React.createContext<IAppContex>({} as IAppContex);

interface Props {
  children: React.ReactNode;
}

interface Server {
  endTime: number;
  serverNum: number;
  customers: Customer[];
}

// const MeanInterArival = 12;
// const MeanServiceTime = 15;
const MeanInterArival = 4.75;
const MeanServiceTime = 5.4;

const AppProvider: React.FC<Props> = ({ children }) => {
  const [numberOfCustomers, setNumberOfCustomers] = React.useState(1);
  const [speed, setSpeed] = React.useState(0);
  const [numberOfServers, setNumberOfServers] = React.useState(1);
  const [customerRecords, setCustomerRecords] = React.useState<Customer[]>([]);
  const [distribution, setDistribution] = React.useState<"mmc" | "ggc" | "mgc">("mmc");
  const [distributionInput, setDistributionInput] = React.useState<DistributionInput>({
    c: 1,
  });
  const [queueLengthServers, setQueueLengthServers] = React.useState<Customer[][]>([]);
  const [waitingInTheQueueServers, setWaitingInTheQueueServers] = React.useState<Customer[][]>([]);

  const lamda = useMemo(() => 1 / MeanInterArival, []);
  const meu = useMemo(() => 1 / MeanServiceTime, []);
  const performanceMeasures = useMemo(
    () => mmc_calculation(lamda, meu, numberOfServers),
    [lamda, meu, numberOfServers]
  );

  const generate = (interArrivals: number[], serviceTimes: number[]) => {
    const arrivals = calculateArrivalsFromInterArrivals(interArrivals);
    let servers: Server[] = new Array(numberOfServers).fill({ endTime: 0 });
    servers = servers.map((server, index) => ({ ...server, serverNum: index + 1, customers: [] }));
    const customers: Customer[] = [];

    arrivals.forEach((_, i) => {
      let startTime = -1;
      let serverNum = 0;
      for (let j = 0; j < servers.length; j++) {
        const server = servers[j];
        if (server.endTime <= arrivals[i]) {
          startTime = arrivals[i];
          serverNum = server.serverNum;
          server.endTime = startTime + serviceTimes[i];
          break;
        }
      }
      if (startTime === -1) {
        let sorted = servers.sort((a, b) => a.endTime - b.endTime);
        serverNum = sorted[0].serverNum;
        startTime = sorted[0].endTime;
        sorted[0].endTime = startTime + serviceTimes[i];
      }
      let endTime = startTime + serviceTimes[i];
      let arrival = arrivals[i];
      let waitTime = startTime - arrival;
      let turnaroundTime = endTime - arrival;
      let obj: Customer = {
        arrival,
        interArrival: interArrivals[i],
        serviceTime: serviceTimes[i],
        server: serverNum,
        startTime,
        endTime,
        waitTime,
        turnaroundTime,
      };
      customers.push(obj);
      servers.find((item) => item.serverNum === serverNum)?.customers.push(obj);
    });
    setCustomerRecords(customers);
    return servers;
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
    return generate(interArrivals, serviceTimes);
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
        distribution,
        setDistribution,
        distributionInput,
        setDistributionInput,
        queueLengthServers,
        setQueueLengthServers,
        waitingInTheQueueServers,
        setWaitingInTheQueueServers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
