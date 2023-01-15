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
  return u * Math.log(Math.random()) * -1;
}

//an array of 20 values whose average is 5.5 and all values has to be distinct
//this function will always gives an array whose average ranges from 4.7 to 6.2
export function generateServiceTimes() {
  const serviceTimes = [];
  for (let i = 0; i < 20; i++) {
    serviceTimes.push(Math.floor(Math.random() * 10) + 1);
  }
  return serviceTimes;
}

//thse are the service times in minutes
export const serviceTimes: number[] = [4, 4, 6, 4, 2, 9, 4, 3, 5, 9, 9, 2, 4, 8, 7, 6, 8, 4, 3, 7];
//this is unix timestamp with of arrival times
//it's inter has to be calculated, then the average.
export const arrivalTimes = [
  1673060710, 1673060890, 1673060890, 1673061610, 1673061910, 1673061970, 1673062090, 1673062330, 1673062750,
  1673063110, 1673063350, 1673063530, 1673064010, 1673064070, 1673064430, 1673064730, 1673064970, 1673065330,
  1673065630, 1673066410,
];

//calculate the difference of arrival times and store them in an array

export const calculateInterArrivalTimes = (arrivals: number[]) => {
  const arrivalTimeDifferences: number[] = [];
  for (let i = 0; i < arrivals.length; i++) {
    if (i === 0) {
      arrivalTimeDifferences.push(0);
    } else {
      arrivalTimeDifferences.push(arrivals[i] - arrivals[i - 1]);
    }
  }
  return arrivalTimeDifferences;
};

export function calculateAverage(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}
