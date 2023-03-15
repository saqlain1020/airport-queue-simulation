import React from "react";
import useApp from "../../hooks/useApp";
import { Typography, Card } from "@mui/material";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Label } from "recharts";
import { v4 as uuid } from "uuid";
import { getColor } from "../../utils/common";
import { makeStyles } from "@mui/styles";



const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "rgb(250,250,250)",
    color: "black",
    fontSize:'18px'
  },
}));

const CustomTooltip = ({ active, payload }:any) => {
const classes = useStyles();
if (active && payload && payload.length) {
  return (
    <div className={classes.root}>
      <div>Customer No: {payload[0].payload.id}</div>
      <div>Turnaround Time: {payload[0].payload.turnaroundTime}</div>
    </div>
  );
}
return null;
};

const TurnaroundTimeGraph = () => {
  const { customerRecords, waitingInTheQueueServers } = useApp();

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
              Server {i + 1}
            </Typography>

            <div style={{ paddingRight: 20 }}>
              <ResponsiveContainer width="100%" aspect={3}>
                <BarChart width={600} height={300} data={server}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="id" unit="C" name="Customer Number" type="category">
                    <Label value="Customer#" angle={0} position="centerBottom" dy={13}  fill={getColor()} />
                  </XAxis>
                  <YAxis dataKey="turnaroundTime" unit="mins" name="turnaround" type="number">
                    <Label
                      value="Turnaround Time"
                      angle={-90}
                      position="insideLeft"
                      dx={-2}
                      dy={30}
                      fill={getColor()}
                    />
                  </YAxis>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" align="right" iconType={"circle"} iconSize={10} />
                  <Bar name="Turnaround Time" type="monotone" dataKey="turnaroundTime" stroke="red" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
    </Card>
  );
};

export default TurnaroundTimeGraph;
