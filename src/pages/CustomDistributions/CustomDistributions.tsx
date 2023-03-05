import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, AppBar, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InputDistributionParameters from "../../components/InputDistributionParameters/InputDistributionParameters";

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

const CustomDistributions: React.FC<IProps> = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <AppBar sx={{ p: 1 }}>
        <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography fontWeight={"bold"} variant="h5" className={classes.appHeading}>
            Airport Security Boarding Queue Simulation
          </Typography>
          <Button color="secondary" variant="contained" onClick={() => navigate("/")} className={classes.appButton}>
            Simulation
          </Button>
        </Container>
      </AppBar>
      <Container sx={{ pt: "70px" }} maxWidth="lg">
        <InputDistributionParameters />
      </Container>
    </div>
  );
};

export default CustomDistributions;
