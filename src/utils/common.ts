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
    sum += (Math.E ** -lambda * lambda ** i) / factorial(i)
  }
  return sum;
}

export function generateRandomExponential(u: number) {
  return u * Math.log(Math.random()) * -1;
}