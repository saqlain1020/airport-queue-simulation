import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, Theme, Typography } from "@mui/material";
import useApp from "../../hooks/useApp";
import { mmc_calculation } from "../../utils/MMC";
import { useLocation } from "react-router";

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
    color: theme.palette.primary.main,
  },
  wrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
    marginTop: 20,
  },
  detail: {
    fontSize: "12px !important",
    color: "rgba(255,255,255,0.4) !important",
    fontWeight: "bold !important",
  },
  value: {
    color: theme.palette.success.main,
  },
}));

interface IProps {
  performanceMeasures: Partial<ReturnType<typeof mmc_calculation>>;
}

const PerformanceMeasures: React.FC<IProps> = ({ performanceMeasures }) => {
  const classes = useStyles();
  const { serverSpecs } = useApp();
  const location = useLocation();
  console.log(location.pathname);
  return (
    <Card sx={{ p: 2, mt: 2 }} className={classes.root}>
      <Typography fontWeight={"bold"} variant="h5">
        Performance Measures
      </Typography>
      <div className={classes.wrapper}>
        <Card sx={{ p: 1 }} elevation={2}>
          <div className={classes.row}>
            <Typography variant="h6" fontWeight={"bold"} className={classes.subHeading}>
              L:
            </Typography>
            <Typography variant="h6" fontWeight={"bold"} className={classes.value}>
              {performanceMeasures?.l}
            </Typography>
          </div>
          <Typography align="center" className={classes.detail}>
            Average Customers in System
          </Typography>
        </Card>
        <Card sx={{ p: 1 }} elevation={2}>
          <div className={classes.row}>
            <Typography variant="h6" fontWeight={"bold"} className={classes.subHeading}>
              Lq:
            </Typography>
            <Typography variant="h6" fontWeight={"bold"} className={classes.value}>
              {performanceMeasures?.lq}
            </Typography>
          </div>
          <Typography align="center" className={classes.detail}>
            Average Customers in Queue
          </Typography>
        </Card>
        <Card sx={{ p: 1 }} elevation={2}>
          <div className={classes.row}>
            <Typography variant="h6" fontWeight={"bold"} className={classes.subHeading}>
              W:
            </Typography>
            <Typography variant="h6" fontWeight={"bold"} className={classes.value}>
              {performanceMeasures?.w} (min)
            </Typography>
          </div>
          <Typography align="center" className={classes.detail}>
            Average Waiting Customers in System
          </Typography>
        </Card>
        <Card sx={{ p: 1 }} elevation={2}>
          <div className={classes.row}>
            <Typography variant="h6" fontWeight={"bold"} className={classes.subHeading}>
              Wq:
            </Typography>
            <Typography variant="h6" fontWeight={"bold"} className={classes.value}>
              {performanceMeasures?.wq} (min)
            </Typography>
          </div>
          <Typography align="center" className={classes.detail}>
            Average Waiting Customers in Queue
          </Typography>
        </Card>
        {location.pathname === "/" &&
          serverSpecs.map((server, i) => (
            <Card key={i} sx={{ p: 1 }} elevation={2}>
              <div className={classes.row}>
                <Typography variant="h6" fontWeight={"bold"} className={classes.subHeading}>
                  Utlization Server {i + 1}:
                </Typography>
                <Typography variant="h6" fontWeight={"bold"} className={classes.value}>
                  {server.utilization}
                </Typography>
              </div>
            </Card>
          ))}
        {/* <Card sx={{ p: 1 }} elevation={2}>
          <div className={classes.row}>
            <Typography variant="h6" fontWeight={"bold"} className={classes.subHeading}>
              idle:
            </Typography>
            <Typography variant="h6" fontWeight={"bold"} className={classes.value}>
              {performanceMeasures?.idle}
            </Typography>
          </div>
          <Typography align="center" className={classes.detail}>
            Average Idle Time of Server
          </Typography>
        </Card>
        <Card sx={{ p: 1 }} elevation={2}>
          <div className={classes.row}>
            <Typography variant="h6" fontWeight={"bold"} className={classes.subHeading}>
              P
            </Typography>
            <Typography variant="h6" fontWeight={"bold"} className={classes.value}>
              {performanceMeasures?.p}
            </Typography>
          </div>
          <Typography align="center" className={classes.detail}>
            Average Utilization of server
          </Typography>
        </Card> */}
      </div>
    </Card>
  );
};

export default PerformanceMeasures;
