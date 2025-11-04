import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Briefcase,
  Globe,
  Users,
  Package,
} from "lucide-react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";



const CompanyDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const company = location.state?.comp;

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-500 text-lg">No company data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10 px-6 md:px-12">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 text-blue-700 hover:text-blue-900 transition font-semibold"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Companies
      </button>

      {/* 🏢 Company Header Section */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white rounded-2xl p-4 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between shadow-lg mb-10">
        <div className="flex items-center gap-6  flex-col md:flex-row">
          <div >
            {company.logoUrl ? (
            <img
            //  
            src="https://tripol.ch/wordpress/wp-content/themes/tripol/img/logo.png"
              alt={company.companyName}
              className="w-24 h-24 rounded-xl border-2 border-white p-2 bg-white object-contain"
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center bg-white/20 rounded-xl border-2 border-white/30">
              <Building2 className="w-10 h-10 text-white" />
            </div>
          )}
          </div>

          <div className=" w-full flex flex-col  items-center md:items-start">
            <h1 className="text-2xl md:text-3xl font-bold">
              {company.companyName}
            </h1>
            <p className="text-gray-200 mt-1 text-xs md:text-sm ">
              {company.companyTypes?.join(", ") || "Company"}
            </p>
            {company.numberOfEmployees && (
              <p className="flex items-center gap-1 text-sm mt-2 text-gray-100">
                <Users className="w-4 h-4" />
                {company.numberOfEmployees} Employees
              </p>
            )}
          </div>
        </div>

        {/* 🌐 Website */}
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="mt-6 md:mt-0 flex items-center gap-2 text-sm text-blue-100 hover:text-white transition"
          >
            <Globe className="w-4 h-4" />
            {company.website}
          </a>
        )}
      </div>

      {/* 🧩 About Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 hover:shadow-md transition">
        <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-600" />
          About Company
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          {company.companyDescription || "No company description available."}
        </p>
      </div>

      {/* 🏷 Services */}
      {company.services?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 hover:shadow-md transition">
          <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Package className="w-5 h-5 text-green-600" />
            Services Offered
          </h2>
          <div className="flex flex-wrap gap-2">
            {company.services.map((service, index) => (
              <span
                key={index}
                className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm border border-green-100"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 📦 Products */}
      {/* 📦 Products */}
{company.products?.length > 0 && (
  <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 hover:shadow-md transition">
    <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
      <AiFillProduct className="w-5 h-5 text-amber-500" />
      Products
    </h2>
    <div className="grid md:grid-cols-2 gap-4">
      {company.products.map((product, index) => (
        <div
          key={index}
          className="p-4 border border-gray-200 rounded-xl hover:shadow-md bg-gray-50 transition"
        >
          <div className="flex space-x-3">
            <div className="md:w-20 md:h-20 w-10 h-10 bg-slate-700 rounded-md flex items-center justify-center border">
              {product.productLogoUrlr ? (
                <img
                  src={product.productLogoUrl}
                  alt={product.productName}
                  className="w-20 h-20 object-contain rounded-md bg-white"
                />
              ) : (
                <Package className="md:w-10 md:h-10 w-5 h-5  text-slate-50" />
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-1 mt-1">
                {product.productName || `Product ${index + 1}`}
              </h3>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            {product.productDescription || "No description available."}
          </p>
         <div className="text-lg flex justify-end">
             <a href={product.productWebsite}> <MdArrowOutward/></a>
         </div>
          
        </div>
      ))}
    </div>
  </div>
)}
      {/* 🏢 Branches */}
      {company.branch?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 hover:shadow-md transition">
          <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Branches
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {company.branch.map((b, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-xl bg-gray-50 hover:shadow-md transition"
              >
                <div className="flex items-center space-x-2 mb-1">
                  <MapPin className="text-blue-500 w-4 h-4" />
                  <h3 className="text-md font-semibold text-gray-800">
                    {b.branchName}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  {b.address?.street || ""}, {b.address?.city || ""},{" "}
                  {b.address?.state || ""}, {b.address?.country || ""}
                </p>
                {b.headQuarter && (
                  <span className="mt-2 inline-block text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    Headquarter
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;