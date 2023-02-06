import React from 'react'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Tooltip, Typography } from '@mui/material';

interface InfoIconProps {
  info: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({ info }) => {
  return (
    <Tooltip title={info} placement="top">
    <Typography variant="caption">
      <InfoOutlinedIcon fontSize='small'/>
    </Typography>
  </Tooltip>
  )
}

export default InfoIcon