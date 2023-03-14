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
    if (
      // !distributionInput.meanInterArrival ||
      // !distributionInput.meanServiceTime ||
      !distributionInput.c
      // !distributionInput.min_service_time ||
      // !distributionInput.max_service_time ||
      // !distributionInput.min_interarrival_time ||
      // !distributionInput.max_interarrival_time
    )
      return;
    const lamda = 1 / distributionInput.meanInterArrival!;
    const meu = 1 / distributionInput.meanServiceTime!;
    const service_time = (distributionInput.min_service_time! + distributionInput.max_service_time!) / 2;
    const mean_service_time = 1 / service_time;
    const interarrival_time = (distributionInput.min_interarrival_time! + distributionInput.max_interarrival_time!) / 2;
    const mean_interarrival_time = 1 / interarrival_time;
    const variance_service_time =
      Math.pow(distributionInput.max_service_time! - distributionInput.min_service_time!, 2) / 12;
    const variance_interarrival_time =
      Math.pow(distributionInput.max_interarrival_time! - distributionInput.min_interarrival_time!, 2) / 12;
    if (distribution === "mmc") {
      setPerformanceMeasures(mmc_calculation(lamda, meu, distributionInput.c));
    } else if (distribution === "mgc") {
      if (!distributionInput.max_service_time && !distributionInput.min_service_time) return;
      setPerformanceMeasures(
        ggc_calculation(lamda, mean_service_time, distributionInput.c, "M", variance_service_time, 1)
      );
    } else if (distribution === "ggc") {
      if (
        !distributionInput.max_service_time ||
        !distributionInput.min_service_time ||
        !distributionInput.max_interarrival_time ||
        !distributionInput.min_interarrival_time
      )
        return;
      setPerformanceMeasures(
        ggc_calculation(
          mean_interarrival_time,
          mean_service_time,
          distributionInput.c,
          "G",
          variance_service_time,
          variance_interarrival_time
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
          {distribution === "mmc" && (
            <>
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
            </>
          )}
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
          {distribution === "mgc" && (
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
          )}
          {(distribution === "mgc" || distribution === "ggc") && (
            <>
              <Grid item sm={6} md={4}>
                <TextField
                  value={distributionInput.min_service_time}
                  name="min_service_time"
                  onChange={handleChange}
                  type="number"
                  required
                  fullWidth
                  variant="standard"
                  label="Min Of Service Time"
                />
              </Grid>
              <Grid item sm={6} md={4}>
                <TextField
                  value={distributionInput.max_service_time}
                  name="max_service_time"
                  onChange={handleChange}
                  type="number"
                  required
                  fullWidth
                  variant="standard"
                  label="Max Of Service Time"
                />
              </Grid>
            </>
          )}
          {distribution === "ggc" && (
            <>
              <Grid item sm={6} md={4}>
                <TextField
                  value={distributionInput.min_interarrival_time}
                  name="min_interarrival_time"
                  onChange={handleChange}
                  type="number"
                  required
                  fullWidth
                  variant="standard"
                  label="Min Of Interarrival Time"
                />
              </Grid>
              <Grid item sm={6} md={4}>
                <TextField
                  value={distributionInput.max_interarrival_time}
                  name="max_interarrival_time"
                  onChange={handleChange}
                  type="number"
                  required
                  fullWidth
                  variant="standard"
                  label="Max Of Interarrival Time"
                />
              </Grid>
            </>
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
