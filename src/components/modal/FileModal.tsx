import { useState } from "react";
import InputField from "../Input/InputField";
import type { CollectionItem } from "../../types/collection";

// interface

const FileModal = () => {
  const [showModal, setShowModal] = useState(false);

  const items: CollectionItem[] = [
    {
      id: "a",
      collection_name: "administration",
      collection_status: "ACTIVE",
      created_at: "2025-05-06 18:03:15.551948+00",
    },
  ];

  const listDropdown = items.map((item) => ({
    key: item.collection_name,
    value: item.collection_name,
  }));

  const modalUploadFile = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="h-full max-w-full">
      <button
        className="ms-2 flex cursor-pointer flex-row items-center justify-center gap-x-2 rounded-lg bg-blue-700 px-3 py-2 hover:bg-blue-800"
        data-modal-target="dashboardModal"
        data-modal-toggle="dashboardModal"
        type="button"
        onClick={modalUploadFile}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="white"
          className="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <p className="font-semibold text-white">Upload File Baru</p>
      </button>

      <div
        id="dashboardModal"
        tabIndex={-1}
        aria-hidden="true"
        // className="fixed top-0 right-0 left-0 z-50 h-[calc(100%)] max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto bg-black md:inset-0"
        className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto ${
          showModal ? "" : "hidden"
        }`}
      >
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={modalUploadFile}
        />

        <div className="relative w-full max-w-md rounded-lg p-4 shadow dark:bg-gray-700">
          <div className="relative rounded-lg bg-white shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Upload file
              </h3>
              <button
                type="button"
                className="end-2.5 ms-auto inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="dashboardModal"
                onClick={modalUploadFile}
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5">
              <form className="space-y-4" action="#">
                <InputField
                  label="Nama Koleksi / Folder"
                  id="collectionName"
                  value={"administration"}
                  //   onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan koleksi / folder"
                  isDropdown={true}
                  listDropdown={listDropdown}
                  name="koleksi"
                />
                <InputField
                  label="File"
                  id="fileUpload"
                  type="file"
                  value={""}
                  //   onChange={(e) => setName(e.target.value)}
                  placeholder="Tambahkan file"
                />
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Upload File
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileModal;
