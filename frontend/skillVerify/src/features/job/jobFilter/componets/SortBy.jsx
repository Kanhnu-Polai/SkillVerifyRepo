import React from 'react'
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

const SortBy = ({val,onChange}) => {
  return (
    <div><FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={val}
            label="Sort by"
            onChange={(e) => onChange("sort", e.target.value)}
          >
            <MenuItem value="newest">Newest Jobs</MenuItem>
            <MenuItem value="highly-applied">Highly Applied</MenuItem>
            <MenuItem value="trending">Trending</MenuItem>
            <MenuItem value="recommended">Recommended</MenuItem>
          </Select>
        </FormControl></div>
  )
}

export default SortBy