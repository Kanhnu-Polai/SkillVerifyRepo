import React, { useState } from "react";
import {
  Close,
  FilterList
} from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Slider,
  Box
} from "@mui/material";

import ExperienceFilter from "../../jobFilter/componets/ExperienceFilter";
import AddHashTags from "../../jobFilter/componets/AddHashTags";

const FilterModal = ({ onClose }) => {
  const [filters, setFilters] = useState({
    sort: "newest",
    startup: false,
    mnc: false,
    productBased: false,
    experience: "ALL",
    salaryRange: [30000, 150000],
    hashTags: [],
  });

  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));

    console.log("Updated Filters:", {
      ...filters,
      [field]: value,
    });
  };

  const handleApplyFilter = () => {
    console.log("Filters applied:", filters);
    onClose(); // close modal
  };

  return (
    <div
      className="bg-black/30 fixed inset-0 flex justify-center items-center p-4 z-50"
      onClick={onClose} // click outside closes modal
    >
      <Box
        className="rounded-2xl shadow-2xl bg-white w-full max-w-md p-5 animate-slideUp"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <FilterList className="text-blue-600" /> Filter Jobs
          </h2>

          <IconButton onClick={()=>onClose(false)}>
            <Close />
          </IconButton>
        </div>

        <Divider className="mb-3" />

        {/* Content */}
        <div className="flex flex-col gap-4">

          {/* Experience */}
          <ExperienceFilter
            val={filters.experience}
            onChange={(field, val) => handleChange(field, val)}
          />

          {/* Hashtags */}
          <AddHashTags
            value={filters.hashTags}
            onChange={(tags) => handleChange("hashTags", tags)}
          />

          {/* Company Type */}
          <div className="flex flex-col gap-1">
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.startup}
                  onChange={(e) => handleChange("startup", e.target.checked)}
                />
              }
              label="Startup"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.mnc}
                  onChange={(e) => handleChange("mnc", e.target.checked)}
                />
              }
              label="MNC"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.productBased}
                  onChange={(e) =>
                    handleChange("productBased", e.target.checked)
                  }
                />
              }
              label="Product Based"
            />
          </div>

          {/* Salary Range */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              Salary Range (₹{filters.salaryRange[0]} - ₹{filters.salaryRange[1]})
            </p>

            <Slider
              value={filters.salaryRange}
              onChange={(e, val) => handleChange("salaryRange", val)}
              min={10000}
              max={300000}
              step={5000}
              valueLabelDisplay="auto"
              sx={{ color: "#2563EB" }}
            />
          </div>

          {/* Apply Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleApplyFilter}
            sx={{
              backgroundColor: "#2563EB",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { backgroundColor: "#1E40AF" },
            }}
          >
            Apply Filters
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default FilterModal;