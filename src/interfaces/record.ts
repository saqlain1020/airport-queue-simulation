export interface Customer {
	index: number;
	arrival: number;
	service: number;
	departure: number;
	waiting: number;
	interarrival: number;
	server: number;
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
