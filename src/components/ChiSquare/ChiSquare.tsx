import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button/Button";
import { useNavigate } from "react-router-dom";
import useApp from "../../hooks/useApp";
import source from "./../../source/data.json";
import { generateNormalDistribution } from "../../utils/common";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  appHeading: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "11px !important",
    },
  },
  appButton: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px !important",
    },
  },
}));

interface IProps {}

const ChiSquare: React.FC<IProps> = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { customerRecords, setNumberOfCustomers, numberOfCustomers, generateArrivals } = useApp();

  useEffect(() => {
    // @ts-ignore
    setNumberOfCustomers(source.shaped.length);
  }, []);

  useEffect(() => {
    generateArrivals();
  }, [numberOfCustomers]);

  useEffect(() => {
    const { normalDistributionInter, normalDistributionService } = generateNormalDistribution(20);

    // @ts-ignore
    const expected: number[] = [
      // ...customerRecords.map((customer) => customer.interArrival),
      // ...customerRecords.map((customer) => customer.serviceTime),
    //   ...normalDistributionInter,
      ...normalDistributionService,
    ];
    const observed: number[] = [
      // @ts-ignore
    //   ...source.shaped.map((customer) => customer.interArrival),
      // @ts-ignore
      ...source.shaped.map((customer) => customer.service),
    ];

    // Chi Square Test
    const chiSquare = expected.reduce((acc, expectedValue, index) => {
      const observedValue = observed[index];
      const difference = Math.abs(expectedValue - observedValue);
      const chiSquareValue = (difference * difference) / expectedValue;
      return acc + (chiSquareValue || 0);
    }, 0);

    console.log("chi", chiSquare,expected.length);
  }, [customerRecords]);
  return (
    <div className={classes.root}>
      <AppBar sx={{ p: 1 }}>
        <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography fontWeight={"bold"} variant="h5" className={classes.appHeading}>
            Airport Security Boarding Queue Simulation
          </Typography>
          <div>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => navigate("/")}
              className={classes.appButton}
              sx={{ ml: 1 }}
            >
              Simulation
            </Button>
          </div>
        </Container>
      </AppBar>
      <Container sx={{ pt: "70px" }} maxWidth="lg"></Container>
    </div>
  );
};

export default ChiSquare;
