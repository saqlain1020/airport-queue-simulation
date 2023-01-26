import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Card, TableBody, TableContainer, Table, TableRow, TableHead, TableCell } from "@mui/material";
import rData from "./../../source/data..json";
import { Customer } from "../../interfaces/record";
import useApp from "../../hooks/useApp";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface IProps {}

const DetailsTable: React.FC<IProps> = () => {
  const { customerRecords, speed } = useApp();
  const [records, setRecords] = React.useState<typeof customerRecords>([]);
  const classes = useStyles();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setRecords([]);
    const interval = setInterval(() => {
      setRecords((prev) => {
        while (prev.length !== customerRecords.length) {
          ref.current?.scroll(0, ref.current.scrollHeight);
          return [...prev, customerRecords[prev.length]];
        }
        return prev;
      });
    }, 500 / speed);

    return () => clearInterval(interval);
  }, [customerRecords]);

  return (
    <Card className={classes.root} sx={{ mt: 2, p: 2 }}>
      <TableContainer ref={ref} sx={{ maxHeight: 400 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <b>C</b>#
              </TableCell>
              <TableCell align="center">
                <b>Arrival</b>
              </TableCell>
              <TableCell align="center">
                <b>Interarrival</b>
              </TableCell>
              <TableCell align="center">
                <b>Service</b>
              </TableCell>
              <TableCell align="center">
                <b>Start</b>
              </TableCell>
              <TableCell align="center">
                <b>End</b>
              </TableCell>
              <TableCell align="center">
                <b>Wait</b>
              </TableCell>
              <TableCell align="center">
                <b>TT</b>
              </TableCell>
              <TableCell align="center">
                <b>Server</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((customer, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{customer.arrival}</TableCell>
                <TableCell align="center">{customer.interArrival}</TableCell>
                <TableCell align="center">{customer.serviceTime}</TableCell>
                <TableCell align="center">{customer.startTime}</TableCell>
                <TableCell align="center">{customer.endTime}</TableCell>
                <TableCell align="center">{customer.waitTime}</TableCell>
                <TableCell align="center">{customer.turnaroundTime}</TableCell>
                <TableCell align="center">{customer.server || 0 + 1}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DetailsTable;
