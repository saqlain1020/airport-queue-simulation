export interface DistributionInput {
  meanInterArrival?: number;
  meanServiceTime?: number;
  c?: number;
  interArrivalType?: "M" | string;
  variance_S?: number;
  variance_A?: number;
}
