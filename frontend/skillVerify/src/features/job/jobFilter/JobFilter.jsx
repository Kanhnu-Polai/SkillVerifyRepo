import React, { useState } from "react";
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
import CompanyType from "./componets/CompanyType";
import AddHashTags from "./componets/AddHashTags";
import ExperienceFilter from "./componets/ExperienceFilter";
import SortBy from "./componets/SortBy";
import SalaryRange from "./componets/SalaryRange";
import ApplyFilterButton from "./componets/ApplyFilterButton";

const JobFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    sort: "newest",
    startup: false,
    mnc: false,
    productBased: false,
    experience:"ALL",
    salaryRange: [30000, 150000],
    hashTags: [],
  });

 



 
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (field, value) => {
  setFilters((prevFilters) => {
    const updated = { ...prevFilters, [field]: value };

    console.log("✅ Updated Filters:", updated); 

    if (onFilterChange) {
      onFilterChange(updated); 
    }

    return updated;
  });

 
};
 const handleApplyFilter = ()=>{
    console.log("Making api Call........")
  }

 
  
  const handleModalToggle = () => setOpenModal(!openModal);

  return (
    <div className="w-full  backdrop-blur-xl rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-gray-100 p-3 md:p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all duration-300 ">
      
      <div className="hidden md:flex items-center justify-between w-full gap-6">
       
        <SortBy val={filters.sort} onChange={handleChange}/>

        <ExperienceFilter val = {filters.experience} onChange = {handleChange}/>

        <AddHashTags/>
        
        <CompanyType mnc = {filters.mnc} startup = {filters.startup} productBased = {filters.productBased}  onChange={handleChange}/>

       
      <SalaryRange salaryRange = {filters.salaryRange} onChange={handleChange} />
       
      <ApplyFilterButton onApply={handleApplyFilter}/>
      </div>

      {/* ======= Mobile View ======= */}
      <div className="flex md:hidden items-center justify-between w-full">
        <IconButton
          onClick={handleModalToggle}
          sx={{
            backgroundColor: "#EEF2FF",
            color: "#2563EB",
            "&:hover": { backgroundColor: "#E0E7FF" },
          }}
        >
          <FilterList />
        
        </IconButton>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Sort</InputLabel>
          <Select
            value={filters.sort}
            label="Sort"
            onChange={(e) => handleChange("sort", e.target.value)}
          >
            <MenuItem value="newest">Newest Jobs</MenuItem>
            <MenuItem value="highly-applied">Highly Applied</MenuItem>
            <MenuItem value="trending">Trending</MenuItem>
            <MenuItem value="recommended">Recommended</MenuItem>
          </Select>
        </FormControl>
      </div>


      {/* ======= Mobile Modal ======= */}
      <Modal open={openModal} onClose={handleModalToggle}>
        <Box className=" rounded-t-2xl shadow-2xl   absolute top-1/5  w-full max-w-md -translate-x-1/2 animate-slideUp  left-1/2">
          <div className="bg-white rounded-md p-5 m-2">
            <div className="flex justify-between items-center mb-4 ">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <FilterList className="text-blue-600" /> Filter Jobs
            </h2>
            <IconButton onClick={handleModalToggle}>
              <Close />
            </IconButton>
          </div>
          <Divider className="mb-3" />

          <div className="flex flex-col gap-4">
            {/* Hashtags */}
            <ExperienceFilter/>
           <AddHashTags/>

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
                Salary Range (₹{filters.salaryRange[0]} - ₹
                {filters.salaryRange[1]})
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

            {/* Apply */}
            <Button
              variant="contained"
              fullWidth
              onClick={handleModalToggle}
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
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default JobFilter;