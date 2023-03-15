const lq_mm1 = (rho) => {
    let lq = (rho ** 2) / (1 - rho)
    //setQueueLength(lq);
    return lq;
}

const calc_Wq = (lq,lambda) => {
    let wq = lq / lambda;
    //setWaitinQueue(wq);
    return wq;
}

const calc_W = (wq,meu) => {
    let w = wq + (1 / meu);
    //setWaitinSystem(w);
    return w;
}

const calc_L = (w,lambda) => {
    let l = lambda * w;
    //setSystemLength(l);
    return l;
}

const calc_idle = (rho) => {
    let idle = 1 - rho;
    //setIdleTime(idle)
    return idle;
}

export const mm1_calculation = (p,lambda,meu) => {
    let lq = lq_mm1(p);
    let wq = calc_Wq(lq,lambda)
    let w = calc_W(wq,meu)
    let l = calc_L(w,lambda)
    let idle = calc_idle(p)

    return {
        lq,
        wq,
        w,
        l,
        idle,
    }
}