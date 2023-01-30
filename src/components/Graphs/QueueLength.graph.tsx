import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from "recharts";
import { v4 as uuid } from "uuid";
import useApp from "../../hooks/useApp";
import { Customer } from "../../interfaces/record";
import { makeStyles } from "@mui/styles";
import { Card, Typography, Theme } from "@mui/material";
import { separateCustomerServerWise } from "../../utils/common";

const useStyles = makeStyles((theme: Theme) => ({
	root: {},
}));

const sampleData = [
	{
		name: "Python",
		student: 13,
		fees: 10,
	},
	{
		name: "Javascript",
		student: 15,
		fees: 12,
	},
	{
		name: "PHP",
		student: 5,
		fees: 10,
	},
	{
		name: "Java",
		student: 10,
		fees: 5,
	},
	{
		name: "C#",
		student: 9,
		fees: 4,
	},
	{
		name: "C++",
		student: 10,
		fees: 8,
	},
];

const QueueLengthGraph: React.FC = () => {
	const classes = useStyles();

	const { customerRecords, queueLengthServers, setQueueLengthServers } = useApp();

	React.useEffect(() => {
		if (customerRecords.length > 0) {
			getQueueLengthAt();
		}
	}, [customerRecords]);

	const getQueueLengthAt = () => {
		if (customerRecords.length > 0) {
			//add new attribute to each server i.e. queueLength
			const servers = separateCustomerServerWise(customerRecords);
			servers.forEach((server, i) => {
				server.forEach((c: any, i) => {
					if (i === 0) {
						server[i] = { ...server[i], queueLength: 0 };
						return;
					}
					const previousCustomer = server[i - 1];
					//if customer has arrived but previous customer has not left yet
					if (c.arrival < previousCustomer.endTime!) {
						server[i] = {
							...server[i],
							queueLength: previousCustomer.queueLength ? previousCustomer.queueLength + 1 : 1,
						};
						return;
					} else {
						server[i] = { ...server[i], queueLength: 0 };
					}
				});
			});
			setQueueLengthServers(servers);
		}
	};

	return (
		<>
			<Card sx={{ p: 2, mt: 2 }} className={classes.root}>
				<Typography fontWeight={"bold"} variant="h5">
					Queue Length Graphs
				</Typography>
				{queueLengthServers.length > 0 &&
					queueLengthServers.map((server, i) => (
						<div key={uuid()}>
							<Typography color="primary" fontWeight={"bold"} variant="subtitle1" sx={{ mt: 1 }}>
								Server {i + 1}
							</Typography>
							<div style={{ paddingRight: 20 }}>
								<ResponsiveContainer width="100%" aspect={3}>
									<LineChart data={server}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="arrival">
											<Label value="Arrivals" position="insideBottom" dy={10} />
										</XAxis>
										<YAxis dataKey="queueLength">
											<Label value="Queue Length" angle={-90} position="insideLeft" dx={10} dy={30} />
										</YAxis>
										<Tooltip contentStyle={{ backgroundColor: "rgb(250,250,250)", color: "black" }} />
										<Legend verticalAlign="top" align="right" iconType={"circle"} iconSize={10} />
										<Line type="monotone" dataKey="queueLength" stroke="red" dot={false} />
									</LineChart>
								</ResponsiveContainer>
							</div>
						</div>
					))}
			</Card>
			{/* 
			<h1 className="chart-heading">Area Chart</h1>
			<ResponsiveContainer width="100%" aspect={3}>
				<AreaChart
					width={500}
					height={300}
					data={sampleData}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Area type="monotone" dataKey="student" stroke="#8884d8" fill="#8884d8" />
				</AreaChart>
			</ResponsiveContainer>

			<h1 className="chart-heading">Bar Chart</h1>
			<ResponsiveContainer width="100%" aspect={3}>
				<BarChart
					width={500}
					height={300}
					data={sampleData}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="student" fill="#8884d8" />
					<Bar dataKey="fees" fill="#82ca9d" />
				</BarChart>
			</ResponsiveContainer> */}
		</>
	);
};

export default QueueLengthGraph;
