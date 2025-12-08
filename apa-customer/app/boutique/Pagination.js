const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center items-center h-16 bg-white shadow-md rounded-xl p-2 max-w-lg mx-auto">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={`mr-2 h-8 w-8 text-gray-500 hover:text-gray-700 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}>&lt;</button>

      <ul className="flex space-x-2">
        {pages.map((page) => (
          <li key={page}>
            <button onClick={() => onPageChange(page)} className={`flex h-10 w-10 items-center justify-center rounded-full text-sm transition-colors duration-200 ${page === currentPage ? "bg-primary-300 text-white hover:bg-primary-500" : "text-gray-600 hover:bg-gray-100"}`}>{page}</button>
          </li>
        ))}
      </ul>

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`ml-2 h-8 w-8 text-gray-500 hover:text-gray-700 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}>&gt;</button>
    </nav>
  );
};

export default Pagination;
