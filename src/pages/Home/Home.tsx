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
import TATGraph from "../../components/Graphs/TATGraph";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: 20,
  },
}));

interface IProps {}

const Home: React.FC<IProps> = () => {
  const classes = useStyles();
  const { performanceMeasures, numberOfCustomers, setNumberOfCustomers, speed, setSpeed, numberOfServers, setNumberOfServers, generateArrivals } = useApp();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <AppBar sx={{ p: 1 }}>
        <Container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography fontWeight={"bold"} variant="h5">
            Airport Security Boarding Queue Simulation
          </Typography>
          <Button color="secondary" variant="contained" onClick={() => navigate("/custom")}>
            Custom Distributions
          </Button>
        </Container>
      </AppBar>
      <Container sx={{ pt: "70px" }} maxWidth="lg">
        <InputParameters />
        <DetailsTable />
        <PerformanceMeasures performanceMeasures={performanceMeasures} />
        <TATGraph/>
      </Container>
    </div>
  );
};

export default Home;
