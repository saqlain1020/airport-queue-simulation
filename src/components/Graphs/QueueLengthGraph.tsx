import React from "react";
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
import { v4 as uuid} from 'uuid';
import useApp from "../../hooks/useApp";
import { Customer } from "../../interfaces/record";
import { makeStyles } from "@mui/styles";
import { Card, Typography, Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},

}));

const pdata = [
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

  const { customerRecords, servers, setServers } = useApp();

	React.useEffect(() => {
		if (customerRecords.length > 0) {
			getQueueLengthAt();
		}
	}, [customerRecords]);

	const separateCustomerServerWise = () => {
    let servers:Customer[][] = [];
    let maxServerNumber = 0;
	
    //get max server number
    customerRecords.forEach((c:Customer) => maxServerNumber = c.server! > maxServerNumber ? c.server! : maxServerNumber);
    
		//array of array. each index contains customers for that server
    for(let i = 0; i < customerRecords.length; i++) {
      let server = customerRecords[i].server;
      if(server) {
        if (!servers[server]) {
          servers[server] = [];
        }
        servers[server].push(customerRecords[i]);
      }
    }
    return servers;
    
	};

	const getQueueLengthAt = () => {
		if (customerRecords.length > 0) {
      //add new attribute to each server i.e. queueLength
			const servers = separateCustomerServerWise();
			servers.forEach((server, i) => {
        server.forEach((c: any, i) => {
          let previousCustomer: Customer = {};
  
          if (i === 0) {
            server[i] = { ...server[i], queueLength: 0}
            return;
          }
          if (i > 0) {
            previousCustomer = server[i - 1];
          }
          //if customer has arrived but previous customer has not left yet
          if (c.arrival < previousCustomer.endTime!) {
            server[i] = {
              ...server[i],
              queueLength: previousCustomer.queueLength ? previousCustomer.queueLength + 1 : 1,
            };
            return;
          } else {
            server[i] = { ...server[i], queueLength: 0};
          }
        });  
      })
      console.log('================= SERVERS ===================');
      console.log(servers)
      console.log('================= SERVERS ===================');
      setServers(servers);
    }
	};

	return (
		<>
    <Card sx={{ p: 2, mt: 2 }} className={classes.root}>
      <Typography fontWeight={"bold"} variant="h5">
        Queue Length Graphs
      </Typography>
    {servers?.length > 0 && servers!.map((server, i) => 
    <div key={uuid()}>  
      <Typography fontWeight={"bold"} variant="subtitle1">
        server {i}
      </Typography>
			<ResponsiveContainer width="100%" aspect={3}>
				<LineChart data={server} width={500} height={300} margin={{ top: 5, right: 300, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="arrival" interval={0} tickFormatter={(value) => value} >
            <Label value="Arrivals" position="bottom" />
          </XAxis>
					<YAxis dataKey="queueLength" interval={0} tickFormatter={(value) => value}>
           <Label value="Queue Length" angle={-90} position="left" dy="-10"/>
          </YAxis>
					<Tooltip contentStyle={{ backgroundColor: "#00627A", color:"white" }} />
					<Legend />
					<Line type="monotone" dataKey="queueLength"  stroke="red" activeDot={{ r: 2 }} />
				</LineChart>
			</ResponsiveContainer>
      </div>
    )}
    </Card>

			<h1 className="chart-heading">Area Chart</h1>
			<ResponsiveContainer width="100%" aspect={3}>
				<AreaChart
					width={500}
					height={300}
					data={pdata}
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
					data={pdata}
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
			</ResponsiveContainer>
		</>
	);
};

export default QueueLengthGraph;
