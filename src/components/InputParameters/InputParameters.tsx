import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Card, Typography, Grid, TextField , MenuItem, Button} from "@mui/material";
import useApp from "../../hooks/useApp";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface IProps {}

const InputParameters: React.FC<IProps> = () => {
  const classes = useStyles();
  const {
    numberOfCustomers,
    numberOfServers,
    setNumberOfServers,
    setNumberOfCustomers,
    speed,
    setSpeed,
    generateArrivals,
  } = useApp();

  return (
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
            <MenuItem value={0}>Instant</MenuItem>
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
        <Button sx={{ mt: 2 }} onClick={generateArrivals} variant="contained">
          Run Simulation
        </Button>
      </div>
    </Card>
  );
};

export default InputParameters;
