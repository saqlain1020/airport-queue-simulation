import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Container, Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import useApp from "../../hooks/useApp";
import DetailsTable from "../../components/DetailsTable/DetailsTable";
import PerformanceMeasures from "../../components/PerformanceMeasures/PerformanceMeasures";
import InputParameters from "../../components/InputParameters/InputParameters";
import { useNavigate } from "react-router-dom";
import { generateRandomExponential, generateServiceTimes } from "../../utils/common";
import { mmc_calculation } from "../../utils/MMC";
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
        <Card sx={{ p: 2 }}>
          <Typography variant="h5" fontWeight={"bold"}>
            Input Parameters
          </Typography>
          <Grid container spacing={2} sx={{ pt: 2 }}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                type={"number"}
                fullWidth
                variant="standard"
                label="Number of Customers"
                value={numberOfCustomers}
                onChange={(e) => setNumberOfCustomers(Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                select
                variant="standard"
                label="Speed"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
              >
                <MenuItem value={1}>1x</MenuItem>
                <MenuItem value={2}>2x</MenuItem>
                <MenuItem value={5}>5x</MenuItem>
                <MenuItem value={10}>10x</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="number"
                variant="standard"
                label="Number of Servers"
                value={numberOfServers}
                onChange={(e) => setNumberOfServers(Number(e.target.value))}
              />
            </Grid>
          </Grid>
          <div className="flex">
            <Button sx={{mt:2}} onClick={generateArrivals} variant="contained">Run Simulation</Button>
          </div>
        </Card>
        <DetailsTable/>
        <TATGraph/>
      </Container>
    </div>
  );
};

export default Home;
