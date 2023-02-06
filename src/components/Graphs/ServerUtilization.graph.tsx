import React, { useEffect } from "react";
import useApp from "../../hooks/useApp";
import { separateCustomerServerWise } from "../../utils/common";
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
} from "recharts";
import { v4 as uuid } from "uuid";

const ServerUtilizationGraph = () => {
	const [serverUtilization, setServerUtilization] = React.useState<Customer[][]>([]);
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
	const { customerRecords } = useApp();
	useEffect(() => {
		//follow the above steps and model data for server utilization
		//add new attribute to each server i.e. arrivalAverage and serviceTimeAverage. at every arrival
		let servers = separateCustomerServerWise(customerRecords);
    addArrivalAverageAndServiceTimeAverageAtEveryArrival(servers);
    addUtilizationAtEveryArrival(servers);

	}, [customerRecords]);

	const addArrivalAverageAndServiceTimeAverageAtEveryArrival = (servers: Customer[][]) => {
		
		if (servers.length > 0) {
			servers.forEach(server => {
				server.forEach((customer, index) => {
					if (index === 0) {
						server[index] = { ...server[index], arrivalAverage: customer.arrival };
						server[index] = { ...server[index], serviceTimeAverage: customer.serviceTime };
						return;
					}
					const previousCustomer = server[index - 1];
					const previousArrivalAverage = previousCustomer.arrivalAverage;
					const previousServiceTimeAverage = previousCustomer.serviceTimeAverage;
					const newArrivalAverage = (previousArrivalAverage! * index + customer.arrival!) / (index + 1);
					const newServiceTimeAverage = (previousServiceTimeAverage! * index + customer.serviceTime!) / (index + 1);

					server[index] = { ...server[index], arrivalAverage: newArrivalAverage };
					server[index] = { ...server[index], serviceTimeAverage: newServiceTimeAverage };
				});
			});
		}
	};
  //for the first arrival, the utlization will be zero because the customer has been served yet, it has just arrived
  const addUtilizationAtEveryArrival = (servers: Customer[][]) => {
    servers.forEach(server => {
      server.map((customer, index) => {
        return server[index] = {
          ...server[index],
          utilizationAtArrival: customer.serviceTimeAverage === 0 ? 0 : customer.arrivalAverage! / customer.serviceTimeAverage!
        }
      })
    });
		setServerUtilization(servers);

  }

	return(		<Card sx={{ p: 2, mt: 2 }}>
		<Typography fontWeight={"bold"} variant="h5">
			Server Utilization Graphs
		</Typography>
		{serverUtilization.length > 0 &&
			serverUtilization.map((server, i) => (
				<div key={uuid()}>
					<Typography color="primary" fontWeight={"bold"} variant="subtitle1" sx={{mt:1}}>
						Server {i+1}
					</Typography>

					<div style={{paddingRight:20}}>

					<ResponsiveContainer width="100%" aspect={3}>
						<LineChart data={server} >
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="arrival">
								<Label value="Arrivals"position="insideBottom" dy={10} />
							</XAxis>
							<YAxis dataKey="utilizationAtArrival">
								<Label value={`Server ${i+1} Utilization`} angle={-90} position="insideLeft" dx={10} dy={30} />
							</YAxis>
							<Tooltip contentStyle={{ backgroundColor: "rgb(250,250,250)", color: "black" }} />
							<Legend verticalAlign="top" align="right" iconType={"circle"} iconSize={10} />
							<Line type="monotone" dataKey="utilizationAtArrival" stroke="red" dot={false} />
						</LineChart>
					</ResponsiveContainer>
					</div>
				</div>
			))}
	</Card>);
};

export default ServerUtilizationGraph;
