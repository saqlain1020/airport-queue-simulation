import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Card, TableBody, TableContainer, Table, TableRow, TableHead, TableCell } from "@mui/material";
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
    if (speed === 0) {
      setRecords(customerRecords);
      return;
    }

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
              <TableCell title="Customer Number"  align="center">
                <b>C</b>#
              </TableCell>
              <TableCell title="Arrival Time" align="center">
                <b>Arrival (min)</b>
              </TableCell>
              <TableCell title="Interarrival Time" align="center">
                <b>Interarrival (min)</b>
              </TableCell>
              <TableCell  title="Service Time" align="center">
                <b>Service (min)</b>
              </TableCell>
              <TableCell title="Start Time" align="center">
                <b>Start (min)</b>
              </TableCell>
              <TableCell title="End Time" align="center">
                <b>End (min)</b>
              </TableCell>
              <TableCell title="Wait Time" align="center">
                <b>Wait (min)</b>
              </TableCell>
              <TableCell title="Turnaround Time" align="center">
                <b>TT (min)</b>
              </TableCell>
              <TableCell title="Server Number" align="center">
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
                <TableCell align="center">{customer.server}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DetailsTable;
