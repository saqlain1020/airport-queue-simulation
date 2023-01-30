import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Container, Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import useApp from "../../hooks/useApp";
import DetailsTable from "../../components/DetailsTable/DetailsTable";
import PerformanceMeasures from "../../components/PerformanceMeasures/PerformanceMeasures";
import InputParameters from "../../components/InputParameters/InputParameters";
import { useNavigate } from "react-router-dom";
import QueueLengthGraph from "../../components/Graphs/QueueLength.graph";
import WaitingInTheQueueGraph from "../../components/Graphs/WaitingInTheQueue.graph";
import TurnaroundTimeGraph from "../../components/Graphs/TurnaroundTime.graph";
import ServerUtilizationGraph from "../../components/Graphs/ServerUtilization.graph";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: 20,
  },
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

const Home: React.FC<IProps> = () => {
  const classes = useStyles();
  const { performanceMeasures } = useApp();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <AppBar sx={{ p: 1 }}>
        <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography fontWeight={"bold"} variant="h5" className={classes.appHeading}>
            Airport Security Boarding Queue Simulation
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => navigate("/custom")}
            className={classes.appButton}
          >
            Custom Distributions
          </Button>
        </Container>
      </AppBar>
      <Container sx={{ pt: "70px" }} maxWidth="lg">
        <InputParameters />
        <DetailsTable />
        <PerformanceMeasures performanceMeasures={performanceMeasures} />
        <ServerUtilizationGraph/>
        <QueueLengthGraph />
        <WaitingInTheQueueGraph />
        <TurnaroundTimeGraph/>
      </Container>
    </div>
  );
};

export default Home;
