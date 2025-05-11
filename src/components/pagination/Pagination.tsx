const Pagination = () => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">1</span>{" "}
        to{" "}
        <span className="font-semibold text-gray-900 dark:text-white">10</span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">100</span>{" "}
        Entries
      </span>
      <div className="xs:mt-0 mt-2 inline-flex">
        <button className="flex h-8 cursor-pointer items-center justify-center rounded-s bg-gray-600 px-3 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <svg
            className="me-2 h-3.5 w-3.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Prev
        </button>
        <button className="flex h-8 cursor-pointer items-center justify-center rounded-e border-0 border-s border-gray-700 bg-gray-600 px-3 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Next
          <svg
            className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
