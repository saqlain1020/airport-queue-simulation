import { mmc_calculation_lq } from "./MMC";

const lq_wq_ggc = (
  p: number,
  lambda: number,
  meu: number,
  c: number,
  interArrivalType: string,
  variance_S: number,
  variance_A: number
) => {
  const { lq: mmc_lq, wq: mmc_wq } = mmc_calculation_lq(p, lambda, meu, c);
  if (interArrivalType === "M") {
    let coeff_A = 1;
    let coeff_S = variance_S / (1 / meu) ** 2;

    let wq = mmc_wq * ((coeff_A + coeff_S) / 2);
    let lq = wq * lambda;

    return {
      lq,
      wq,
    };
  } else {
    let coeff_A = variance_A / (1 / lambda) ** 2;
    let coeff_S = variance_S / (1 / meu) ** 2;

    let wq = mmc_wq * ((coeff_A + coeff_S) / 2);
    let lq = wq * lambda;

    return {
      lq,
      wq,
    };
  }
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

export const ggc_calculation = (
  lambda: number,
  meu: number,
  c: number,
  /**
   * interArrivalType: "M" for MGC, any else for GGC
   */
  interArrivalType: string,
  variance_S: number,
  variance_A: number
) => {
  let p = lambda / meu;
  let { lq, wq } = lq_wq_ggc(p, lambda, meu, c, interArrivalType, variance_S, variance_A);
  let w = calc_W(wq, meu);
  let l = calc_L(w, lambda);
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
    obj[key] = Math.abs(obj[key]).toFixed(3);
  }

  return obj;
};
