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

const WaitingInTheQueueGraph = () => {
	const { customerRecords, waitingInTheQueueServers, setWaitingInTheQueueServers } = useApp();

	React.useEffect(() => {
		if (customerRecords.length > 0) {
			const servers = separateCustomerServerWise(customerRecords);
			setWaitingInTheQueueServers(servers);
		}
	}, [customerRecords]);

	return (
		<Card sx={{ p: 2, mt: 2 }}>
			<Typography fontWeight={"bold"} variant="h5">
				Wait Time Graphs
			</Typography>
			{waitingInTheQueueServers.length > 0 &&
				waitingInTheQueueServers.map((server, i) => (
					<div key={uuid()}>
						<Typography fontWeight={"bold"} variant="subtitle1">
							server {i}
						</Typography>
						<ResponsiveContainer width="100%" aspect={3}>
							<LineChart data={server} width={500} height={300} margin={{ top: 5, right: 300, left: 20, bottom: 5 }}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="arrival" interval={0} tickFormatter={(value) => value}>
									<Label value="Arrivals" position="bottom" />
								</XAxis>
								<YAxis dataKey="waitTime" interval={0} tickFormatter={(value) => value}>
									<Label value="Wait Time" angle={-90} position="left" dy="-10" />
								</YAxis>
								<Tooltip contentStyle={{ backgroundColor: "#00627A", color: "white" }} />
								<Legend />
								<Line type="monotone" dataKey="waitTime" stroke="red" activeDot={{ r: 2 }} />
							</LineChart>
						</ResponsiveContainer>
					</div>
				))}
		</Card>
	);
};

export default WaitingInTheQueueGraph;
