export interface DistributionInput {
  meanInterArrival?: number;
  meanServiceTime?: number;
  c?: number;
  interArrivalType?: "M" | string;
  variance_S?: number;
  variance_A?: number;
  min_service_time?:number
  max_service_time?:number
  min_interarrival_time?:number
  max_interarrival_time?:number
}
