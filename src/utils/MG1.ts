const lq_mg1 = (rho: number, lambda: number, variance_s: number): number => {
    let lq = (((lambda ** 2) * variance_s) + rho ** 2) / (2 * (1 - rho))
    return lq;
  }
  
  const calc_Wq = (lq: number, lambda: number): number => {
    let wq = lq / lambda;
    return wq;
  }
  
  const calc_W = (wq: number, meu: number): number => {
    let w = wq + (1 / meu);
    return w;
  }
  
  const calc_L = (w: number, lambda: number): number => {
    let l = lambda * w;
    return l;
  }
  
  const calc_idle = (rho: number): number => {
    let idle = 1 - rho;
    return idle;
  }
  
  export const mg1_calculation = (lambda: number, meu: number, variance_s: number): Record<string, number> => {
    let p = lambda / (1 * meu);
    let lq = lq_mg1(p, lambda, variance_s);
    let wq = calc_Wq(lq, lambda)
    let w = calc_W(wq, meu)
    let l = calc_L(w, lambda)
    let idle = calc_idle(p)
  
    return {
      lq,
      wq,
      w,
      l,
      p,
      idle,
    }
  }
  