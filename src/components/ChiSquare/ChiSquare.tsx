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
import { arrivalTimes, calculateInterArrivalTimes, chiSquare, chiSquareObservedFreqs, generateNormalDistribution, getExpectedFrequencies, getExpectedFrequenciesAndSummation, MLE, probabilityDistribution, serviceTimes } from "../../utils/common";

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

  /**
   * @Mutahhir
   * @dev use debugger to see the values of the variables
   */
  useEffect(() => {

    console.log('======================================')
    const interArrivals = calculateInterArrivalTimes(arrivalTimes);

    // Here, numIntervals represents the number of intervals to use for the chi-squared test.
    //We are using 5 intervals in this case.
    const numIntervals = 5;
    console.log('ineer', interArrivals)

    const interArrivalObservedFreqs = chiSquareObservedFreqs(interArrivals, numIntervals);
    const serviceTimeObservedFreqs = chiSquareObservedFreqs(serviceTimes, numIntervals);
    
    const observedFrequenciesSummation1 = interArrivalObservedFreqs.reduce((acc, el) => acc + el, 0); //inter arrival
    const observedFrequenciesSummation2 = serviceTimeObservedFreqs.reduce((acc, el) => acc + el, 0);  //service time

    
    const {MLEs:interArrivalMLE, sum:interObservedSum} = MLE(interArrivalObservedFreqs);
    const {MLEs:serviceTimeMLE, sum:serviceObservedSum} = MLE(serviceTimeObservedFreqs);
    
    const calculatedLambdaForInterArrivalTime = interObservedSum / observedFrequenciesSummation1;
    const calculatedLambdaForServiceTime = serviceObservedSum / observedFrequenciesSummation2;
    
    const InterArrivalprobabilities = Array(numIntervals).fill(0).map((_, index) => probabilityDistribution(calculatedLambdaForInterArrivalTime, index))
    const serviceTimeprobabilities = Array(numIntervals).fill(0).map((_, index) => probabilityDistribution(calculatedLambdaForServiceTime, index))
    
    const {expectedFreqs:interArrivalExpectedFrequencies, sum:sumOfInterArrivalExpected} = getExpectedFrequenciesAndSummation(observedFrequenciesSummation1, InterArrivalprobabilities);
    const {expectedFreqs:serviceTimeExpectedFrequencies, sum:sumOserviceTimeExpected} = getExpectedFrequenciesAndSummation(observedFrequenciesSummation2, serviceTimeprobabilities);
    
    const interArrivalChiSquare = chiSquare(interArrivalExpectedFrequencies, interArrivalObservedFreqs);
    const serviceTimeChiSquare = chiSquare(serviceTimeExpectedFrequencies, serviceTimeObservedFreqs);
    
    // debugger;
    console.log('interArrivalChiSquare', interArrivalChiSquare)
    console.log('serviceTimeChiSquare', serviceTimeChiSquare)
    
    console.log('======================================')
  },[])

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
