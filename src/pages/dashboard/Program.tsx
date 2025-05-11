const DashboardProgram = () => {
  return (
    <div className="flex w-full flex-col gap-y-3">
      <h2 className="text-2xl font-semibold">Dashboard Program</h2>

      <div className="flex w-full flex-row justify-between">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="flex flex-row">
          <div className="relative">
            <input
              type="text"
              id="simple-search"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search..."
              required
            />
          </div>
          <button
            type="submit"
            className="ms-2 cursor-pointer rounded-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>

        {/* <UserModal /> */}
      </div>
    </div>
  );
};

export default DashboardProgram;
