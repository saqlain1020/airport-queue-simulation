const lq_mm1 = (rho: number): number => {
    let lq = (rho ** 2) / (1 - rho)
    //setQueueLength(lq);
    return lq;
  }
  
  const calc_Wq = (lq: number, lambda: number): number => {
    let wq = lq / lambda;
    //setWaitinQueue(wq);
    return wq;
  }
  
  const calc_W = (wq: number, meu: number): number => {
    let w = wq + (1 / meu);
    //setWaitinSystem(w);
    return w;
  }
  
  const calc_L = (w: number, lambda: number): number => {
    let l = lambda * w;
    //setSystemLength(l);
    return l;
  }
  
  const calc_idle = (rho: number): number => {
    let idle = 1 - rho;
    //setIdleTime(idle)
    return idle;
  }
  
  export const mm1_calculation = (lambda: number, meu: number): Record<string, number> => {
    let p = lambda / (1 * meu);
    console.log('rho',p);
    let lq = lq_mm1(p);
    console.log('lq',lq)
    let wq = calc_Wq(lq,lambda)
    let w = calc_W(wq,meu)
    let l = calc_L(w,lambda)
    let idle = calc_idle(p)
  
    return {
      
      lq: Math.round((lq + Number.EPSILON) * 100) / 100,
      wq: Math.round((wq + Number.EPSILON) * 100) / 100 ,
      w: Math.round((w + Number.EPSILON) * 100) / 100 ,
      l: Math.round((l + Number.EPSILON) * 100) / 100 ,
      p ,
      idle:Math.round((idle + Number.EPSILON) * 100) / 100 ,
    }
  }
  