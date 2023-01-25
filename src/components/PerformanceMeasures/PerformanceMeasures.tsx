import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, Theme, Typography } from "@mui/material";
import useApp from "../../hooks/useApp";
import { mmc_calculation } from "../../utils/MMC";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  row: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    justifyContent: "center",
  },
  subHeading: {
    // width: 60,
  },
  wrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 20,
    marginTop: 20,
  },
}));

interface IProps {
  performanceMeasures: ReturnType<typeof mmc_calculation>;
}

const PerformanceMeasures: React.FC<IProps> = ({ performanceMeasures }) => {
  const classes = useStyles();

  return (
    <Card sx={{ p: 2, mt: 2 }} className={classes.root}>
      <Typography fontWeight={"bold"} variant="h5">
        Performance Measures
      </Typography>
      <div className={classes.wrapper}>
        <Card sx={{ p: 1 }} className={classes.row}>
          <Typography variant="h6" fontWeight={"bold"} className={classes.subHeading}>
            L:
          </Typography>
          <Typography variant="h6" fontWeight={"bold"}>
            {performanceMeasures.l}
          </Typography>
        </Card>
        <Card sx={{ p: 1 }} className={classes.row}>
          <Typography variant="h6" fontWeight={"bold"} className={classes.subHeading}>
            Lq:
          </Typography>
          <Typography variant="h6" fontWeight={"bold"}>
            {performanceMeasures.lq}
          </Typography>
        </Card>
        <Card sx={{ p: 1 }} className={classes.row}>
          <Typography variant="h6" fontWeight={"bold"} className={classes.subHeading}>
            W:
          </Typography>
          <Typography variant="h6" fontWeight={"bold"}>
            {performanceMeasures.w}
          </Typography>
        </Card>
        <Card sx={{ p: 1 }} className={classes.row}>
          <Typography variant="h6" fontWeight={"bold"} className={classes.subHeading}>
            Wq:
          </Typography>
          <Typography variant="h6" fontWeight={"bold"}>
            {performanceMeasures.wq}
          </Typography>
        </Card>
        <Card sx={{ p: 1 }} className={classes.row}>
          <Typography variant="h6" fontWeight={"bold"} className={classes.subHeading}>
            Idle:
          </Typography>
          <Typography variant="h6" fontWeight={"bold"}>
            {performanceMeasures.idle}
          </Typography>
        </Card>
        <Card sx={{ p: 1 }} className={classes.row}>
          <Typography variant="h6" fontWeight={"bold"} className={classes.subHeading}>
            P:
          </Typography>
          <Typography variant="h6" fontWeight={"bold"}>
            {performanceMeasures.p}
          </Typography>
        </Card>
      </div>
    </Card>
  );
};

export default PerformanceMeasures;
