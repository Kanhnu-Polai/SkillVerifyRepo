import React, { useEffect, useState } from "react";
import AddCompanyButton from "../../../company/utilsComponets/AddCompanyButton";
import CompanyCreateFormModal from "../../../company/componets/CompanyCreateFormModal";
import { getCompany } from "../../../../apiManager/companyServiceAPI";
import CompanyCard from "../../../company/componets/CompanyCard";

const Company = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [company, setCompany] = useState([]);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await getCompany(localStorage.getItem("userId"));
        setCompany(res);
        console.log("✅ Companies fetched:", res);
      } catch (error) {
        console.error("❌ Error fetching company:", error);
      }
    };

    fetchCompany();
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center p-6">
      {/* If no company found */}
      {(!company || company.length === 0) ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-gray-500 text-lg">No company found</p>
          <AddCompanyButton click={setOpenCreateModal} />
        </div>
      ) : (
        <div className="w-full flex flex-col space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="md:text-2xl font-semibold text-gray-800 text-lg ">Your Companies</h2>
            <AddCompanyButton click={setOpenCreateModal} />
          </div>

         
          <CompanyCard  company = {company}/>
         
        </div>
      )}

      {openCreateModal && (
        <CompanyCreateFormModal onClose={setOpenCreateModal} />
      )}
    </div>
  );
};

export default Company;