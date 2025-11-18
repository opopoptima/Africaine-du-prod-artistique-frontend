import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Utility class names to make it look like the image (Shadcn-like styling)
const buttonBase = 'flex h-10 w-10 items-center justify-center rounded-full text-sm transition-colors duration-200';
const activeClasses = 'bg-primary-300 text-white hover:bg-primary-500';
const inactiveClasses = 'text-gray-600 hover:bg-gray-100';
const arrowClasses = 'h-8 w-8 text-gray-500 hover:text-gray-700';

const Pagination = ({ totalPages = 7, initialPage = 1 }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <nav 
      role="navigation" 
      aria-label="Pagination Navigation" 
      className="flex justify-center items-center h-16 bg-white shadow-md rounded-xl p-2 max-w-lg mx-auto"
    >
      
      {/* --- Previous Button --- */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`mr-2 ${arrowClasses} ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Go to previous page"
      >
        <ChevronLeft size={24} />
      </button>

      {/* --- Page Numbers --- */}
      <ul className="flex list-none p-0 m-0 space-x-2">
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => handlePageChange(page)}
              className={`${buttonBase} ${
                page === currentPage ? activeClasses : inactiveClasses
              } font-medium`}
              aria-current={page === currentPage ? 'page' : undefined}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
      
      {/* --- Next Button --- */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`ml-2 ${arrowClasses} ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Go to next page"
      >
        <ChevronRight size={24} />
      </button>

    </nav>
  );
};

export default Pagination;