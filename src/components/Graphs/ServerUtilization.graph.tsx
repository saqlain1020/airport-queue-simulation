import React, { useEffect } from "react";
import useApp from "../../hooks/useApp";
import { getColor } from "../../utils/common";
import { Customer } from "../../interfaces/record";
import { Typography, Card } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  Scatter,
  ScatterChart,
} from "recharts";
import { v4 as uuid } from "uuid";

const ServerUtilizationGraph = () => {
  // const [serverUtilization, setServerUtilization] = React.useState<Customer[][]>([]);
  /**
   * to calculate an average based off of an existing average and given new parameters for the resulting average?
   * newAve = ((oldAve*oldNumPoints) + x)/(oldNumPoints+1)
   *
   * To create a server utilization graph for a G/G/1 approximation, follow these steps:
   * Calculate the average arrival rate (lambda) and average service rate (mu).
   * Utilization is defined as lambda/mu.
   * Plot the utilization on the Y-axis and time on the X-axis to see the utilization over time.
   * The graph should show a steady state utilization rate that approaches the calculated utilization value as time increases.
   */
  const { serverSpecs } = useApp();
  // useEffect(() => {
  //   //follow the above steps and model data for server utilization
  //   //add new attribute to each server i.e. arrivalAverage and serviceTimeAverage. at every arrival
  //   let servers = separateCustomerServerWise(customerRecords);
  //   addArrivalAverageAndServiceTimeAverageAtEveryArrival(servers);
  //   addUtilizationAtEveryArrival(servers);
  // }, [customerRecords]);

  // const addArrivalAverageAndServiceTimeAverageAtEveryArrival = (servers: Customer[][]) => {
  //   if (servers.length > 0) {
  //     servers.forEach((server) => {
  //       server.forEach((customer, index) => {
  //         if (index === 0) {
  //           server[index] = { ...server[index], arrivalAverage: customer.arrival };
  //           server[index] = { ...server[index], serviceTimeAverage: customer.serviceTime };
  //           return;
  //         }
  //         const previousCustomer = server[index - 1];
  //         const previousArrivalAverage = previousCustomer.arrivalAverage;
  //         const previousServiceTimeAverage = previousCustomer.serviceTimeAverage;
  //         const newArrivalAverage = (previousArrivalAverage! * index + customer.arrival!) / (index + 1);
  //         const newServiceTimeAverage = (previousServiceTimeAverage! * index + customer.serviceTime!) / (index + 1);

  //         server[index] = { ...server[index], arrivalAverage: newArrivalAverage };
  //         server[index] = { ...server[index], serviceTimeAverage: newServiceTimeAverage };
  //       });
  //     });
  //   }
  // };
  // //for the first arrival, the utlization will be zero because the customer has been served yet, it has just arrived
  // const addUtilizationAtEveryArrival = (servers: Customer[][]) => {
  //   servers.forEach((server) => {
  //     server.map((customer, index) => {
  //       return (server[index] = {
  //         ...server[index],
  //         utilizationAtArrival:
  //           customer.serviceTimeAverage === 0 ? 0 : customer.arrivalAverage! / customer.serviceTimeAverage!,
  //       });
  //     });
  //   });
  //   setServerUtilization(servers);
  // };
  // console.log(serverUtilization);

  return (
    <Card sx={{ p: 2, mt: 2 }}>
      <Typography fontWeight={"bold"} variant="h5">
        Server Utilization Graphs
      </Typography>

      <div>
        <div style={{ paddingRight: 20, paddingTop: 50 }}>
          <ResponsiveContainer width="100%" aspect={3}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" type="number" name="arrival" unit="min" />
              <YAxis dataKey="y" type="number" name="utilization" unit="%">
                <Label value="Utlilzation %" angle={-90} position="insideLeft" dx={0} dy={30} fill={getColor()} />
              </YAxis>
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              {serverSpecs.length > 0 &&
                serverSpecs.map((server, i) => (
                  <Scatter
                    key={uuid()}
                    name={`Server ${i + 1} Arrival (min)`}
                    data={server.utilizationArr.map((item) => ({ x: item.arrival, y: item.utilization }))}
                    fill={getColor()}
                    line={{ strokeWidth: 3 }}
                  />
                ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default ServerUtilizationGraph;
