export interface Customer {
  arrival?: number;
  interArrival?: number;
  serviceTime?: number;
  server?: number;
  startTime?: number;
  endTime?: number;
  waitTime?: number;
  turnaroundTime?: number;
  queueLength?: number;
}

export interface InterArrivals {
  newInterArrivals: number[];
  oldMean: number;
  newStdDev: number;
}

export interface ServiceTimes {
  newServiceTimes: number[];
  oldMean: number;
  newStdDev: number;
  newServiceTimesInMinutes: number[];
}
