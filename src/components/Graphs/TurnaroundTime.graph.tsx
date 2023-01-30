import React from "react";
import useApp from "../../hooks/useApp";
import { separateCustomerServerWise } from "../../utils/common";
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
	AreaChart,
	Area,
	BarChart,
	Bar,
	Label,
} from "recharts";
import { v4 as uuid } from "uuid";
import { Customer } from "../../interfaces/record";

const TurnaroundTimeGraph = () => {
	const { customerRecords, waitingInTheQueueServers, setWaitingInTheQueueServers } = useApp();

	React.useEffect(() => {
		// if (customerRecords.length > 0) {
		// 	const servers = separateCustomerServerWise(customerRecords);
		// 	setWaitingInTheQueueServers(servers);
		// }
	}, [customerRecords]);

	return (
		<Card sx={{ p: 2, mt: 2 }}>
			<Typography fontWeight={"bold"} variant="h5">
				Turnaround Time Graphs
			</Typography>
			{waitingInTheQueueServers.length > 0 &&
				waitingInTheQueueServers.map((server, i) => (
					<div key={uuid()}>
						<Typography color="primary" fontWeight={"bold"} variant="subtitle1" sx={{ mt: 1 }}>
							Server {i}
						</Typography>

						<div style={{ paddingRight: 20 }}>
							<ResponsiveContainer width="100%" aspect={3}>
								<BarChart width={500} height={300} data={server}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis>
										<Label value="Customers" position="insideBottom" dy={10} />
									</XAxis>
									<YAxis dataKey="turnaroundTime">
										<Label value="Turnaaround" angle={-90} position="insideLeft" dx={10} dy={30} />
									</YAxis>
									<Tooltip contentStyle={{ backgroundColor: "rgb(250,250,250)", color: "black" }} />
									<Legend verticalAlign="top" align="right" iconType={"circle"} iconSize={10} />
									<Bar type="monotone" dataKey="turnaroundTime" stroke="red" fill="#8884d8" />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>
				))}
		</Card>
	);
};

export default TurnaroundTimeGraph;
