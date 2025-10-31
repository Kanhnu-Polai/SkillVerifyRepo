import React from 'react'
import {
  Button,
 
} from "@mui/material";
const ApplyFilterButton = ({onApply}) => {
  return (
    <Button
              variant="contained"
             onClick={onApply}
              
              sx={{
                backgroundColor: "#2563EB",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": { backgroundColor: "#1E40AF" },
              }}
            >
              Apply Filters
            </Button>
  )
}

export default ApplyFilterButton