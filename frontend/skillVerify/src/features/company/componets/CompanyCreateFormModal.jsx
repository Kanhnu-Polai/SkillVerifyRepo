import React, { useEffect, useState } from 'react';

import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2TypeInfo from './steps/Step2TypeInfo';
import Step3AdditionalInfo from './steps/Step3AdditionalInfo';
import Step4BranchesInfo from './steps/Step4BranchesInfo';
import Step5ProductInfo from './steps/Step5ProductInfo';

const CompanyCreateFormModal = ({onClose}) => {

  const [company, setCompany] = useState({
    companyName: "",
    createdUserId: "",
    companyDescription: "",
    companyTypes: [], // multiple types (STARTUP, PRODUCT_BASED, etc.)
    numberOfBranches: "",
    numberOfEmployees: "",
    website: "",
    logoUrl: "",
    services: [], // list of services (e.g. Software, AI, etc.)
    branches: [],
    products: []
  });
 
  useEffect(() => {
  console.log("🟣 Company object updated:", company);
}, [company]);

  const[currentStep,setCurrenStep] = useState(1);
  const handleNext = ()=>{
    setCurrenStep((prev)=>prev+1)
  }

  const handlePrev = ()=>{
    setCurrenStep((prev)=>prev-1)
  }




  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
   <div className= "bg-white w-full mx-3 max-w-md p-6 rounded-2xl shadow-lg relative transition-all">

   
    <div>
      {currentStep==1 && <Step1BasicInfo company = {company} setCompany = {setCompany}/>}
      {currentStep==2 && <Step2TypeInfo company = {company} setCompany = {setCompany} />}
      {currentStep==3 && <Step3AdditionalInfo company = {company} setCompany = {setCompany} />}
      {currentStep==4 && <Step4BranchesInfo company = {company} setCompany = {setCompany} />}
      {currentStep==5 && <Step5ProductInfo company = {company} setCompany = {setCompany} />}
    
    </div>
    <div className="flex justify-between mt-6">
      {
        currentStep==1 && (
            <button onClick={()=>onClose(false)} className="px-4 py-2 bg-red-200 text-black rounded-md">
         Cancel
        </button>
        )
      }
      {currentStep > 1 && (
        <button onClick={handlePrev} className="px-4 py-2 bg-gray-400 text-white rounded-md">
          Back
        </button>
      )}
      {currentStep < 5 ? (
        <button onClick={handleNext} className="px-4 py-2 bg-indigo-600 text-white rounded-md">
          Next
        </button>
      ) : (
        <button
          onClick={() => console.log(formData)}
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Submit
        </button>
      )}
    </div>
   
   </div>
    </div>
  );
};

export default CompanyCreateFormModal;