import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Card, TableBody, TableContainer, Table, TableRow, TableHead, TableCell } from "@mui/material";
import rData from "./../../source/data..json";
import {Customer} from "../../interfaces/record";
import useApp from "../../hooks/useApp";


const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface IProps {}

const DetailsTable: React.FC<IProps> = () => {
  const {customerRecords} = useApp();
  const classes = useStyles();
  
  return (
    <>
{      customerRecords.map((entry: Customer|any, index:number) => 
        <Card className={classes.root} sx={{ mt: 2, p: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center"><b>C</b>#</TableCell>
                  <TableCell align="center"><b>Arrival</b></TableCell>
                  <TableCell align="center"><b>Service</b></TableCell>
                  <TableCell align="center"><b>Wait</b></TableCell>
                  <TableCell align="center"><b>Server</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">1</TableCell>
                  <TableCell align="center">1</TableCell>
                  <TableCell align="center">1</TableCell>
                  <TableCell align="center">1</TableCell>
                  <TableCell align="center">1</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </>

  );
};

export default DetailsTable;
