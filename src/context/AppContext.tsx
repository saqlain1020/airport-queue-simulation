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
  generateNormalDistribution,
  poissonInterArrivals,
  getInterArrivalsFromRange,
} from "../utils/common";
import { mmc_calculation } from "../utils/MMC";
import source from "./../source/data.json";

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
  serverSpecs: {
    startTime: number;
    endTime: number;
    serviceTime: number;
    utilization: number;
    utilizationArr: { utilization: number; arrival: number }[];
  }[];
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
const MeanInterArival = source.MeanInterArival;
const MeanServiceTime = source.MeanServiceTime;

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
        id: i + 1,
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
    // const { normalDistributionInter, normalDistributionService } = generateNormalDistribution(numberOfCustomers);
    // console.log( normalDistributionInter, normalDistributionService)
    // const serviceTimes = generateServiceTimes(numberOfCustomers);
    // const interArrivals = generateServiceTimes(numberOfCustomers);

    const interArrivals: number[] = [...getInterArrivalsFromRange(poissonInterArrivals(source.MeanInterArival))];
    const serviceTimes: number[] = [];
    // const serviceTimes: number[] = [...getInterArrivalsFromRange(poissonInterArrivals(source.MeanServiceTime))];
    interArrivals[0] = 0
    for (let i = 0; i < interArrivals.length; i++) {
      // interArrivals.push(generateRandomExponential(MeanInterArival));
      serviceTimes.push(generateRandomExponential(MeanServiceTime));
    }

    // interArrivals[0] = 0;
    // const serviceTimes = orignalServiceTime;
    // const interArrivals = calculateInterArrivalTimes(orignalArivalTimes);

    return generate(interArrivals, serviceTimes);
    // return generate( normalDistributionInter, normalDistributionService);
  };

  const serverSpecs = useMemo(() => {
    let arr: {
      startTime: number;
      endTime: number;
      serviceTime: number;
      utilization: number;
      utilizationArr: { utilization: number; arrival: number }[];
    }[] = [];

    // const totalServiceTime = customerRecords.reduce((prev, curr) => (prev += curr.serviceTime!), 0);
    // @ts-ignore
    const totalEndtimeServers: { [key: number]: number } = customerRecords.reduce((acc, curr) => {
      // @ts-ignore
        acc[curr.server] = curr.endTime;
      return acc;
    }, {});

    const totalEndtime = Object.values(totalEndtimeServers).reduce((prev, curr) => (prev += curr), 0);
    customerRecords.forEach((item) => {
      if (!item.server || !item.endTime || !item.serviceTime) return;
      const server = item.server;
      if (!arr[server - 1]) {
        arr[server - 1] = {
          startTime: 0,
          endTime: 0,
          serviceTime: 0,
          utilization: 0,
          utilizationArr: [],
        };
      }
      const obj = arr[server - 1];
      obj.endTime = item.endTime;
      obj.serviceTime += item.serviceTime;
      obj.utilizationArr.push({ utilization: (obj.serviceTime / totalEndtime) * 100, arrival: item.arrival! });
    });

    arr = arr.map((item) => {
      return {
        ...item,
        utilization: Number((item.serviceTime / totalEndtime).toFixed(2)),
      };
    });
    return arr;
  }, [customerRecords]);

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
        serverSpecs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
