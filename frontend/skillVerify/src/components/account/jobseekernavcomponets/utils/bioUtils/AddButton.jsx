import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function AddButton({setView,tolTipText = "Add more"}) {
  
  return (
    <Tooltip title={tolTipText} >

        <IconButton onClick={()=>setView(true)}>
        <AddBoxIcon/>
      </IconButton>
     
    </Tooltip>
  );
}
