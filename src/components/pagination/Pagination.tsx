import React from "react";
import type { IPagination } from "../../types/pagination";

interface PaginationProps {
  pagination: IPagination;
  onPageChange: (newSkip: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (pagination.is_prev) {
      onPageChange(Math.max(pagination.skip - pagination.limit, 0));
    }
  };

  const handleNext = () => {
    if (pagination.is_next) {
      onPageChange(pagination.skip + pagination.limit);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-700">
        Showing{" "}
        <span className="font-semibold text-gray-900">{pagination.start}</span>{" "}
        to <span className="font-semibold text-gray-900">{pagination.end}</span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900">{pagination.total}</span>{" "}
        Entries
      </span>
      <div className="xs:mt-0 mt-2 inline-flex">
        <button
          onClick={handlePrev}
          className={`flex h-8 items-center justify-center rounded-s px-3 text-sm font-medium text-white ${pagination.is_prev ? "cursor-pointer bg-gray-600 hover:bg-gray-900" : "cursor-not-allowed bg-gray-400"}`}
        >
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
        <button
          onClick={handleNext}
          className={`flex h-8 items-center justify-center rounded-e border-0 border-s border-gray-700 px-3 text-sm font-medium text-white ${pagination.is_next ? "cursor-pointer bg-gray-600 hover:bg-gray-900" : "cursor-not-allowed bg-gray-400"}`}
        >
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
