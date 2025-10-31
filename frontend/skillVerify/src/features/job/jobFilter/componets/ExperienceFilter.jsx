import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Slider,
  Modal,
  Box,
  IconButton,
  Button,
 
  Divider,
} from "@mui/material";

const ExperienceFilter = ({val,onChange}) => {
    console.log(val)
  return (
    <div className="mt-2 md:mt-0" >
      <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel >Exeperience</InputLabel>
          <Select
            value={val}
            label="Experience"
            onChange={(e)=>onChange("experience",e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="highly-applied">Fresher</MenuItem>
            <MenuItem value="0-2 Years">0-2 Years</MenuItem>
            <MenuItem value="2-5 Years">2-5 Years</MenuItem>
            <MenuItem value="5-10 Years">5-10 Years</MenuItem>
            <MenuItem value="10+ Years">10+ Years</MenuItem>

          </Select>
        </FormControl>

    </div>
  );
};

export default ExperienceFilter;