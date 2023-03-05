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
  Label,
  ScatterChart,
  Scatter,
} from "recharts";
import { v4 as uuid } from "uuid";
import useApp from "../../hooks/useApp";
import { Customer } from "../../interfaces/record";
import { makeStyles } from "@mui/styles";
import { Card, Typography, Theme } from "@mui/material";
import { getColor, separateCustomerServerWise } from "../../utils/common";

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
        {/* {queueLengthServers.length > 0 &&
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
          ))} */}

        <div style={{ paddingRight: 20, paddingTop: 50 }}>
          <ResponsiveContainer width="100%" aspect={3}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" type="number" name="Arrival" unit="min" />
              <YAxis dataKey="y" type="number" name="Queue Length">
                <Label value="Queue Length" angle={-90} position="insideLeft" dx={0} dy={30} fill={getColor()} />
              </YAxis>
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              {queueLengthServers.length > 0 &&
                queueLengthServers.map((server, i) => (
                  <Scatter
                    key={uuid()}
                    name={`Server ${i + 1} Arrival (min)`}
                    data={server.map((c: Customer) => ({ x: c.arrival, y: c.queueLength }))}
                    fill={getColor()}
                    line={{ strokeWidth: 3 }}
                  />
                ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </>
  );
};

export default QueueLengthGraph;
