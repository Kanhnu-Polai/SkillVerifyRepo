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
import {
  FilterList,
  MonetizationOn,
  Close,
  Tag,
} from "@mui/icons-material";

const SalaryRange = ({salaryRange,onChange}) => {
  return (
    <div className="flex flex-col min-w-[200px]">
          <div className="flex items-center gap-1 text-gray-600 text-sm mb-1">
            <MonetizationOn fontSize="small" className="text-green-500" />
            <span>
              ₹{salaryRange[0].toLocaleString()} - ₹
              {salaryRange[1].toLocaleString()}
            </span>
          </div>
          <Slider
            value={salaryRange}
            onChange={(e, val) => onChange("salaryRange", val)}
            min={10000}
            max={300000}
            step={5000}
            sx={{ color: "#2563EB" }}
          />
        </div>
  )
}

export default SalaryRange