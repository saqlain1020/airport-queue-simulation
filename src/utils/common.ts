import { Customer, InterArrivals as InterArrivalsType, ServiceTimes as ServiceTimesType } from "../interfaces/record";
import data from "./../source/data.json";

// This gives value for p
// => p
export function calculateUtilizationOfServers(lambda: number, meu: number, numberOfServers: number) {
  return lambda / (numberOfServers * meu);
}

// => W
export function calcMeanWaitingTimeInSystem(wq: number, meu: number) {
  return wq + 1 / meu;
}

// => Wq
export function calculateMeanWaitingTimeInQueue(lq: number, lambda: number) {
  return lq / lambda;
}

// => L
export function caluMeanNumberOfCustomersInSystem(lambda: number, w: number) {
  return lambda * w;
}

// =>Lq
export function calcMeanNumberOfCustomersInQueue(
  p: number,
  p0: number,
  lambda: number,
  meu: number,
  numberOfCustomers: number
) {
  return (p0 * (lambda / meu) ** numberOfCustomers * p) / (factorial(numberOfCustomers) * (1 - p) ** 2);
}

// =>P0
export function calculateProbabilityOfZeroCustomersInSystem(p: number, numberOfServers: number) {
  const calcPart1 = () => {
    let sum = 0;
    for (let i = 0; i < numberOfServers; i++) {
      sum += (numberOfServers * p) ** i / factorial(i);
    }
    return sum;
  };

  const calcPart2 = () => {
    return (numberOfServers * p) ** numberOfServers / (factorial(numberOfServers) * (1 - p));
  };

  return 1 / (calcPart1() + calcPart2());
}

export function factorial(n: number): number {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}

export function calcProbabilityPoisson(lambda: number, x: number) {
  let sum = 0;
  for (let i = 0; i <= x; i++) {
    sum += (Math.E ** -lambda * lambda ** i) / factorial(i);
  }
  return sum;
}

export function generateRandomExponential(u: number) {
  let num = Math.floor(u * Math.log(Math.random()) * -1);
  if (num === 0) {
    num = generateRandomExponential(u);
  }
  return num;
}

//this function will always gives an array whose average ranges from 4.7 to 6.2
export function generateServiceTimes(customerLength: number = 20): number[] {
  const serviceTimes = [];
  for (let i = 0; i < customerLength; i++) {
    serviceTimes.push(Math.floor(Math.random() * 10) + 1);
  }
  return serviceTimes;
}

//thse are the service times in minutes
export const serviceTimes: number[] = [4, 4, 6, 4, 2, 9, 4, 3, 5, 9, 9, 2, 4, 8, 7, 6, 8, 4, 3, 7];
//this is unix timestamp of arrival times
//it's inter has to be calculated, then the average.
export const arrivalTimes = [
  1673060710, 1673060890, 1673061130, 1673061610, 1673061910, 1673061970, 1673062090, 1673062330, 1673062750,
  1673063110, 1673063350, 1673063530, 1673064010, 1673064070, 1673064430, 1673064730, 1673064970, 1673065330,
  1673065630, 1673066410,
];

export const calculateInterArrivalTimes = (arrivals: number[]): number[] => {
  const arrivalTimeDifferences: number[] = [];
  for (let i = 0; i < arrivals.length; i++) {
    if (i === 0) {
      arrivalTimeDifferences.push(0);
    } else {
      arrivalTimeDifferences.push((arrivals[i] - arrivals[i - 1]) / 60);
    }
  }
  return arrivalTimeDifferences;
};

export function calculateAverage(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export const calculateStandardDeviation = (values: number[], mean?: number): number => {
  const avg = mean ? mean : calculateAverage(values);
  const squareDiffs = values.map((value) => {
    const diff = value - avg!;
    const sqrDiff = diff * diff;
    return sqrDiff;
  });
  const avgSquareDiff = calculateAverage(squareDiffs);
  const stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
};

//all calculation is done in seconds
export function transformInterArrivalsToExactMean(arrivals: number[], newMean: number): InterArrivalsType {
  const interArrivals = calculateInterArrivalTimes(arrivalTimes);
  const oldMean = calculateAverage(interArrivals); //returned in seconds
  const oldStdDev = calculateStandardDeviation(arrivals);
  const newStdDev = calculateStandardDeviation(interArrivals, newMean);

  const newInterArrivals = interArrivals.map((interArrival) => {
    return (newStdDev * (interArrival - oldMean)) / oldStdDev + newMean;
  });
  return {
    newInterArrivals,
    oldMean,
    newStdDev,
  };
}

export function transformServiceTimeToExactMean(services: number[], newMean: number): ServiceTimesType {
  const oldMean = calculateAverage(services); //returned in seconds
  const oldStdDev = calculateStandardDeviation(services);
  const newStdDev = calculateStandardDeviation(services, newMean);

  const newServiceTimes = services.map((service) => {
    return (newStdDev * (service - oldMean)) / oldStdDev + newMean;
  });
  return {
    newServiceTimes,
    oldMean,
    newStdDev,
    newServiceTimesInMinutes: newServiceTimes.map((service) => service / 60),
  };
}

export const calculateArrivalsFromInterArrivals = (interArrivals: number[]) => {
  const arrivals: number[] = [];
  for (let i = 0; i < interArrivals.length; i++) {
    if (i === 0) {
      arrivals.push(interArrivals[i]);
    } else {
      arrivals.push(arrivals[i - 1] + interArrivals[i]);
    }
  }
  return arrivals;
};

export const separateCustomerServerWise = (customerRecords: Customer[]) => {
  let servers: Customer[][] = [];
  let maxServerNumber = 0;
  //get max server number
  customerRecords.forEach(
    (c: Customer) => (maxServerNumber = c.server! > maxServerNumber ? c.server! : maxServerNumber)
  );

  //array of array. each index contains customers for that server
  for (let i = 0; i < customerRecords.length; i++) {
    let server = customerRecords[i].server;
    if (server) {
      if (!servers[server]) {
        servers[server] = [];
      }
      servers[server].push(customerRecords[i]);
    }
  }
  //remove empty arrays and return
  return servers.filter((item) => item !== undefined || item !== null || item !== "");
};

// // Random color generate
// export function getRandomColor() {
//   var letters = "0123456789ABCDEF";
//   var color = "#";
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

// // Generate random colors which contrasts with black background
// export function getRandomContrastingColor() {
//   var letters = "0123456789ABCDEF";
//   var color = "#";
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   // Check if color is dark or light
//   var c = color.substring(1); // strip #
//   var rgb = parseInt(c, 16); // convert rrggbb to decimal
//   var r = (rgb >> 16) & 0xff; // extract red
//   var g = (rgb >> 8) & 0xff; // extract green
//   var b = (rgb >> 0) & 0xff; // extract blue

//   var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

//   if (luma < 40) {
//     color = getRandomContrastingColor();
//   }
//   return color;
// }

const colors = [
  "#D0B77A",
  "#DC3BEF",
  "#5ECB83",
  "#C9442F",
  "#947269",
  "#6BEDD1",
  "#7D6DF5",
  "#3AB26C",
  "#829A1D",
  "#A473CF",
  "#3AEB28",
  "#9DC904",
  "#B6FD63",
  "#2A9241",
  "#EAA9AC",
  "#CACC08",
  "#AFC1F4",
  "#F471B6",
  "#51CAF1",
];

export function* getColorGenerator() {
  let index = 0;
  while (true) {
    yield colors[index];
    index = (index + 1) % colors.length;
  }
}
const getColorGeneratorInitialized = getColorGenerator();
export const getColor = () => {
  return getColorGeneratorInitialized.next().value!;
};

// Generate Normal distribution numbers
export function generateNormalDistributionNumber(mean: number, stdDev: number) {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num * stdDev + mean;
  return Number(num.toFixed(1));
}

export const generateNormalDistribution = (numOfCustomers: number) => {
  // loop till num of customers
  let normalDistributionService: number[] = [];
  let normalDistributionInter: number[] = [];
  const meanService = data.shaped.reduce((acc, curr) => acc + curr.service, 0) / data.shaped.length;
  const stdDevService = calculateStandardDeviation(
    data.shaped.map((c) => c.service),
    meanService
  );
  const meanInter = data.shaped.reduce((acc, curr) => acc + curr.interArrival, 0) / data.shaped.length;
  const stdDevInter = calculateStandardDeviation(
    data.shaped.map((c) => c.interArrival),
    meanInter
  );
  for (let i = 0; i < numOfCustomers; i++) {
    normalDistributionService.push(generateNormalDistributionNumber(meanService, stdDevService));
    normalDistributionInter.push(generateNormalDistributionNumber(meanInter, stdDevInter));
  }
  return { normalDistributionService, normalDistributionInter };
};


//usage chiSquareTableee.get(dof);
const chiSquareTableee = new Map([
	[1, 3.8415],
	[2, 5.9915],
	[3, 7.8147],
	[4, 9.4877],
	[5, 11.0705],
	[6, 12.5916],
	[7, 14.0671],
	[8, 15.5073],
	[9, 16.919],
	[10, 18.307],
	[11, 19.6751],
	[12, 21.0261],
	[13, 22.362],
	[14, 23.6848],
	[15, 25.005],
	[16, 26.2962],
	[17, 27.5871],
	[18, 28.8693],
	[19, 30.1435],
	[20, 31.4104],
	[21, 32.6706],
	[22, 33.9244],
	[23, 35.1725],
	[24, 36.415],
	[25, 37.6525],
	[26, 38.8851],
	[27, 40.1133],
	[28, 41.3372],
	[29, 42.557],
	[30, 51.8051],
	[40, 63.1671],
	[50, 74.397],
	[60, 85.5271],
	[70, 96.5782],
	[80, 107.565],
	[90, 118.498],
	[100, 124.342],
]);


export const chiSquareObservedFreqs = (data:number[], numBins:number) =>  {
	// Calculate the range of the data
  const dataMin = Math.min(...data);
  const dataMax = Math.max(...data);
	
	// if max interArrival is 13, and min is 0 and no. of bins = 5 then binWidth = 2.6
  // Calculate the bin width
  const binWidth:number = (dataMax - dataMin) / numBins;

  // Initialize an array to hold the observed frequencies
  const observedFreqs:number[] = new Array(numBins).fill(0);

  // Loop through the data and increment the appropriate frequency bin
  for (const datum of data) {
    const binIndex = Math.floor((datum - dataMin) / binWidth);
		if (binIndex < numBins) {
      observedFreqs[binIndex]++;
    }
  }

  return observedFreqs;
}

/**
 * @see MLE for poisson distribution goodness of fit test
 */
export const MLE = (observeFrquencies:number[]) => {
	let MLEs:number[] = [];
	let sum = 0;
	for(let i = 0; i < observeFrquencies.length; i++) {
		MLEs.push(observeFrquencies[i] * i);
		sum += MLEs[i];
	}
	return {MLEs, sum};
}


//use this in loop till the bin count
//explicitly pass the lambda, using (MLE /  Σ observedFrequency)
export const probabilityDistribution = (lambda:number, x:number) => {
	return (Math.E ** -lambda * lambda ** x) / factorial(x);
}

// returns the summation of expected frequencies and it's array.
export const getExpectedFrequenciesAndSummation = (observedFreqSummation:number, probabilities:number[]) => {
	let sum = 0;
	let expectedFreqs = [];
	for(let i = 0; i < probabilities.length; i++) {
		expectedFreqs.push(probabilities[i] * observedFreqSummation);
		sum += expectedFreqs[i];
	}
	return {expectedFreqs, sum};
}



// Calculate expected frequencies for each interval
//data is inter arrival times or service times
//not using this, because i dont understand it.
export const getExpectedFrequencies = (data:number[], numIntervals:number, mean?:number) => {
	let expectedFreqs = [];
	const sampleMean = mean ? mean : calculateAverage(data);
	for (let i = 0; i < numIntervals; i++) {
		const lowerBound = i === 0 ? 0 : sampleMean * i;
		const upperBound = sampleMean * (i + 1);
		console.log(lowerBound, upperBound)
		const expectedFreq = data.filter((time) => time >= lowerBound && time < upperBound).length * numIntervals;
		expectedFreqs.push(expectedFreq);
	}
	return expectedFreqs;
}

export const chiSquare = (expectedFrequencies:number[], observedFrequencies:number[]) => {
	let chiSquare = 0;
	for (let i = 0; i < expectedFrequencies.length; i++) {	
		chiSquare += Math.pow(Math.abs(observedFrequencies[i] - expectedFrequencies[i]), 2) / expectedFrequencies[i];
	}
	return chiSquare;
}