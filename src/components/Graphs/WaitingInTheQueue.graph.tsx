import React from "react";
import useApp from "../../hooks/useApp";
import { getColor, separateCustomerServerWise } from "../../utils/common";
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
  ScatterChart,
  Scatter,
} from "recharts";
import { v4 as uuid } from "uuid";

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
      {/* {waitingInTheQueueServers.length > 0 &&
        waitingInTheQueueServers.map((server, i) => (
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
                  <YAxis dataKey="waitTime">
                    <Label value="Wait Time" angle={-90} position="insideLeft" dx={10} dy={30} />
                  </YAxis>
                  <Tooltip contentStyle={{ backgroundColor: "rgb(250,250,250)", color: "black" }} />
                  <Legend verticalAlign="top" align="right" iconType={"circle"} iconSize={10} />
                  <Line type="monotone" dataKey="waitTime" stroke="red" dot={false} />
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
            <YAxis dataKey="y" type="number" name="Wait Time" unit="min">
              <Label value="Wait Time" angle={-90} position="insideLeft" dx={0} dy={30} fill={getColor()} />
            </YAxis>
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            {waitingInTheQueueServers.length > 0 &&
              waitingInTheQueueServers.map((server, i) => (
                <Scatter
                  key={uuid()}
                  name={`Server ${i + 1} Arrival (min)`}
                  data={server.map((item) => ({ x: item.arrival, y: item.waitTime }))}
                  fill={getColor()}
                  line={{ strokeWidth: 3 }}
                />
              ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default WaitingInTheQueueGraph;
