"use client";

import { useState } from "react";
import { IoRemove, IoAdd, IoDownloadOutline } from "react-icons/io5";

export default function QuantityOrder({ handleCommander, article }) {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) setQuantity(value);
  };

  const handleOrder = () => {
    handleCommander(quantity);
  };

  const handleDownload = async (url, name) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="flex justify-center lg:justify-end w-full px-4 sm:px-6 md:px-10">
      <div className="w-full max-w-xs sm:max-w-sm bg-white rounded-2xl shadow-lg p-4 sm:p-6 space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        
        {/* Quantity Section */}
        <div className="space-y-2 sm:space-y-3">
          <label className="text-gray-700 font-semibold text-xs sm:text-sm">
            Quantité
          </label>

          <div className="flex items-center justify-between border-2 border-gray-300 rounded-lg overflow-hidden">
            
            {/* Decrease */}
            <button
              onClick={decreaseQuantity}
              className="w-10 sm:w-auto flex justify-center items-center py-2 sm:px-4 sm:py-3 text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <IoRemove className="text-base sm:text-lg" />
            </button>

            {/* Input */}
            <input
              type="number"
              value={quantity}
              onChange={handleInputChange}
              className="w-12 sm:flex-1 text-center py-2 sm:py-3 text-gray-800 font-semibold text-sm sm:text-base focus:outline-none appearance-none"
              min="1"
            />

            {/* Increase */}
            <button
              onClick={increaseQuantity}
              className="w-10 sm:w-auto flex justify-center items-center py-2 sm:px-4 sm:py-3 text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              <IoAdd className="text-base sm:text-lg" />
            </button>
          </div>
        </div>

        {/* Order Button */}
        <button
          onClick={handleOrder}
          className="w-full bg-primary-300 hover:bg-primary-500 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
        >
          Ajouter au Panier
        </button>

        {/* Download Buttons */}
        <div className="flex gap-2 sm:gap-3">
          
          <button
            className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 py-2 border-2 border-primary-300 text-primary-300 rounded-full hover:bg-primary-50 transition-colors text-xs sm:text-sm font-medium"
            onClick={() =>
              handleDownload(article.technicalFile, "fiche-technique.pdf")
            }
          >
            <IoDownloadOutline className="text-sm sm:text-base" />
            Fiche technique
          </button>

          <button
            className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 py-2 border-2 border-primary-300 text-primary-300 rounded-full hover:bg-primary-50 transition-colors text-xs sm:text-sm font-medium"
            onClick={() =>
              handleDownload(article.printedFile, "fiche-de-lecture.pdf")
            }
          >
            <IoDownloadOutline className="text-sm sm:text-base" />
            Fiche de lecture
          </button>

        </div>
      </div>
    </div>
  );
}
