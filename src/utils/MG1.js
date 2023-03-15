const lq_mg1 = (rho, lambda, variance_s) => {
    let lq = (((lambda ** 2) * variance_s) + rho ** 2) / (2 * (1 - rho))
    return lq;
}

const calc_Wq = (lq, lambda) => {
    let wq = lq / lambda;
    return wq;
}

const calc_W = (wq, meu) => {
    let w = wq + (1 / meu);
    return w;
}

const calc_L = (w, lambda) => {
    let l = lambda * w;
    return l;
}

const calc_idle = (rho) => {
    let idle = 1 - rho;
    return idle;
}

export const mg1_calculation = (p, lambda, meu, variance_s) => {
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
        idle,
    }
}