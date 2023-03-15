const lq_gg1 = (rho, lambda, meu, variance_s, variance_a) => {
    let coeff_A = variance_a / ((1 / lambda) ** 2)
    let coeff_S = variance_s / ((1 / meu) ** 2)
    let rho_sq = rho ** 2
    let lq = ((rho_sq) * (1 + coeff_S) * (coeff_A + (rho_sq * coeff_S))) / (2 * (1 - rho) * (1 + (rho_sq * coeff_S)))
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

export const gg1_calculation = (p, lambda, meu, variance_s, variance_a) => {
    let lq = lq_gg1(p, lambda, meu, variance_s, variance_a);
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