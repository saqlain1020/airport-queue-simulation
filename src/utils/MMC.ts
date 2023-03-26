function factorialize(num: number) {
  var result = num;
  if (num === 0 || num === 1) return 1;
  while (num > 1) {
    num--;
    result *= num;
  }
  return result;
}
factorialize(5);

const calc_P0 = (p: number, c: number) => {
  let summation_value = 0;
  for (let m = 0; m < c; m++) {
    summation_value += (c * p) ** m / factorialize(m);
  }

  let p0 = 1 / (summation_value + (c * p) ** c / (factorialize(c) * (1 - p)));

  return p0;
};

//M/M/2
const lq_mmc = (rho: number, lambda: number, meu: number, p0: number, c: number) => {
  let lq = (p0 * (lambda / meu) ** c * rho) / (factorialize(c) * (1 - rho) ** 2);
  return lq;
};

const calc_Wq = (lq: number, lambda: number) => {
  let wq = lq / lambda;
  return wq;
};

const calc_W = (wq: number, meu: number) => {
  let w = wq + 1 / meu;
  return w;
};

const calc_L = (w: number, lambda: number) => {
  let l = lambda * w;
  return l;
};

const calc_idle = (rho: number) => {
  let idle = 1 - rho;
  return idle;
};

export const mmc_calculation = (lambda: number, meu: number, c: number) => {
  let p = lambda / (c * meu);
  let p0 = calc_P0(p, c);
  let lq = Math.abs(lq_mmc(p, lambda, meu, p0, c));
  let wq = Math.abs(calc_Wq(lq, lambda));
  let w = Math.abs(calc_W(wq, meu));
  let l = Math.abs(calc_L(w, lambda));
  let idle = calc_idle(p);

  let obj = {
    lq,
    wq,
    w,
    l,
    p,
    idle,
  };
  for (let key in obj) {
    // @ts-ignore
    obj[key] = obj[key].toFixed(3);
  }

  return obj;
};
export const mmc_calculation_lq = (p: number, lambda: number, meu: number, c: number) => {
  let p0 = calc_P0(p, c);
  let lq = lq_mmc(p, lambda, meu, p0, c);
  let wq = calc_Wq(lq, lambda);

  return {
    lq,
    wq,
  };
};
