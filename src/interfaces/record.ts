export interface Customer {
  id:number;
  arrival?: number;
  interArrival?: number;
  serviceTime?: number;
  server?: number;
  startTime?: number;
  endTime?: number;
  waitTime?: number;
  turnaroundTime?: number;
  queueLength?: number;
  arrivalAverage?: number;
  serviceTimeAverage?: number;
  utilizationAtArrival?: number;
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
