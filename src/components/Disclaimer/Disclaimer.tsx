import React from 'react';
import { makeStyles } from '@mui/styles';
import { Card, Theme, Typography } from '@mui/material';

const useStyles = makeStyles((theme : Theme)=>({
    root:{
    
    }
}))

interface IProps {
}

const Disclaimer : React.FC<IProps> = () => {
    const classes = useStyles();
    
    return (
        <Card sx={{p:1}} className={classes.root}>
                <Typography>Arrivals and Service times are in <b>minutes</b></Typography>
        </Card>
    )
}

export default Disclaimer;