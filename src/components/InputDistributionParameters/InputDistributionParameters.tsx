import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, MenuItem, Card, Typography, TextField, Grid, Button } from "@mui/material";
import useApp from "../../hooks/useApp";
import { mmc_calculation } from "./../../utils/MMC";
import { ggc_calculation } from "./../../utils/GGC";
import PerformanceMeasures from "../PerformanceMeasures/PerformanceMeasures";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface IProps {}

const InputDistributionParameters: React.FC<IProps> = () => {
  const classes = useStyles();
  const { distribution, setDistribution, distributionInput, setDistributionInput } = useApp();
  const [performanceMeasures, setPerformanceMeasures] = React.useState<Partial<ReturnType<typeof ggc_calculation>>>({});

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (e) => {
    setDistributionInput({ ...distributionInput, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!distributionInput.meanInterArrival || !distributionInput.meanServiceTime || !distributionInput.c) return;
    const lamda = 1 / distributionInput.meanInterArrival;
    const meu = 1 / distributionInput.meanServiceTime;
    const p = lamda / meu;
    if (distribution === "mmc") {
        console.log(mmc_calculation(p, lamda, meu, distributionInput.c))
      setPerformanceMeasures(mmc_calculation(p, lamda, meu, distributionInput.c));
    } else if (distribution === "mgc") {
      if (!distributionInput.variance_S) return;
      setPerformanceMeasures(ggc_calculation(lamda, meu, distributionInput.c, "M", distributionInput.variance_S, 1));
    } else if (distribution === "ggc") {
      if (!distributionInput.variance_S || !distributionInput.variance_A) return;
      setPerformanceMeasures(
        ggc_calculation(
          lamda,
          meu,
          distributionInput.c,
          "G",
          distributionInput.variance_S,
          distributionInput.variance_A
        )
      );
    }
  };


  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight={"bold"}>
        Input Parameters
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 2 }} alignItems="center">
          <Grid item sm={6} md={4}>
            <TextField
              select
              fullWidth
              label="Select Distribution"
              variant="standard"
              value={distribution}
              onChange={(e) => setDistribution(e.target.value as any)}
              required
            >
              <MenuItem value="mmc">MMC</MenuItem>
              <MenuItem value="mgc">MGC</MenuItem>
              <MenuItem value="ggc">GGC</MenuItem>
            </TextField>
          </Grid>
          <Grid item sm={6} md={4}>
            <TextField
              value={distributionInput.meanInterArrival}
              name="meanInterArrival"
              onChange={handleChange}
              type="number"
              required
              fullWidth
              variant="standard"
              label="Mean Inter Arival"
            />
          </Grid>
          <Grid item sm={6} md={4}>
            <TextField
              value={distributionInput.meanServiceTime}
              name="meanServiceTime"
              onChange={handleChange}
              type="number"
              required
              fullWidth
              variant="standard"
              label="Mean Service Time"
            />
          </Grid>
          <Grid item sm={6} md={4}>
            <TextField
              value={distributionInput.c}
              name="c"
              onChange={handleChange}
              type="number"
              required
              fullWidth
              variant="standard"
              label="Number of Servers"
            />
          </Grid>
          {distribution === "ggc" && (
            <Grid item sm={6} md={4}>
              <TextField
                value={distributionInput.variance_A}
                name="variance_A"
                onChange={handleChange}
                type="number"
                required
                fullWidth
                variant="standard"
                label="Variance Of Inter Arrival Time"
              />
            </Grid>
          )}
          {(distribution === "mgc" || distribution === "ggc") && (
            <Grid item sm={6} md={4}>
              <TextField
                value={distributionInput.variance_S}
                name="variance_S"
                onChange={handleChange}
                type="number"
                required
                fullWidth
                variant="standard"
                label="Variance Of Service Time"
              />
            </Grid>
          )}
          <Grid item>
            <Button variant="contained" type="submit">
              Calculate
            </Button>
          </Grid>
        </Grid>
      </form>
      <PerformanceMeasures performanceMeasures={performanceMeasures} />
    </Card>
  );
};

export default InputDistributionParameters;
