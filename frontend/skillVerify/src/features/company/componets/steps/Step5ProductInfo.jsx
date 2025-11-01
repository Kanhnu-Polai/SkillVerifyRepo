import React, { useState, useEffect } from "react";

const Step5ProductInfo = ({ company, setCompany }) => {
  const [hasProducts, setHasProducts] = useState(false);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    if (hasProducts && numberOfProducts > 0) {
      const newProducts = Array.from({ length: numberOfProducts }, () => ({
        productName: "",
        productDescription: "",
        productWebsite: "",
        productLogoUrl: "",
      }));
      setCompany((prev) => ({ ...prev, products: newProducts }));
      setCurrentProductIndex(0);
    } else {
      setCompany((prev) => ({ ...prev, products: [] }));
    }
  }, [hasProducts, numberOfProducts]);

  const handleChange = (field, value) => {
    const updatedProducts = [...company.products];
    updatedProducts[currentProductIndex][field] = value;
    setCompany((prev) => ({ ...prev, products: updatedProducts }));
  };

  const handleNextProduct = () => {
    if (currentProductIndex < numberOfProducts - 1)
      setCurrentProductIndex((prev) => prev + 1);
  };

  const handlePrevProduct = () => {
    if (currentProductIndex > 0)
      setCurrentProductIndex((prev) => prev - 1);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">🧩 Company Products</h2>

      {/* Ask if company has products */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">
          Does your company have its own products?
        </label>
        <div className="flex gap-4">
          <button
            onClick={() => setHasProducts(true)}
            className={`px-4 py-2 rounded-md ${
              hasProducts ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => {
              setHasProducts(false);
              setNumberOfProducts(0);
              setCurrentProductIndex(0);
            }}
            className={`px-4 py-2 rounded-md ${
              !hasProducts ? "bg-red-400 text-white" : "bg-gray-200"
            }`}
          >
            No
          </button>
        </div>
      </div>

      {/* Ask number of products */}
      {hasProducts && (
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">
            How many products do you have?
          </label>
          <input
            type="number"
            min="1"
            className="border rounded-md p-2 w-full"
            value={numberOfProducts}
            onChange={(e) =>
              setNumberOfProducts(parseInt(e.target.value) || 0)
            }
          />
        </div>
      )}

      {/* Show one product form at a time */}
      {hasProducts &&
        company.products.length > 0 &&
        company.products[currentProductIndex] && (
          <div className="border p-4 rounded-lg shadow-sm bg-gray-50">
            <h3 className="font-semibold mb-2">
              Product {currentProductIndex + 1} of {numberOfProducts}
            </h3>

            <input
              type="text"
              placeholder="Product Name"
              className="border p-2 mb-2 w-full rounded-md"
              value={company.products[currentProductIndex].productName}
              onChange={(e) => handleChange("productName", e.target.value)}
            />

            <textarea
              placeholder="Product Description"
              className="border p-2 mb-2 w-full rounded-md"
              value={company.products[currentProductIndex].productDescription}
              onChange={(e) =>
                handleChange("productDescription", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Product Website (optional)"
              className="border p-2 mb-2 w-full rounded-md"
              value={company.products[currentProductIndex].productWebsite}
              onChange={(e) => handleChange("productWebsite", e.target.value)}
            />

            <input
              type="text"
              placeholder="Product Logo URL"
              className="border p-2 mb-2 w-full rounded-md"
              value={company.products[currentProductIndex].productLogoUrl}
              onChange={(e) => handleChange("productLogoUrl", e.target.value)}
            />

            {/* Navigation buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevProduct}
                disabled={currentProductIndex === 0}
                className={`px-4 py-2 rounded-md ${
                  currentProductIndex === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-400 text-white"
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNextProduct}
                disabled={currentProductIndex === numberOfProducts - 1}
                className={`px-4 py-2 rounded-md ${
                  currentProductIndex === numberOfProducts - 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 text-white"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default Step5ProductInfo;