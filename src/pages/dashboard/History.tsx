import { useState } from "react";
import DeleteModal from "../../components/modal/DeleteModal";
import type {
  ConversationItem,
  ListUniqueConversationItem,
} from "../../types/conversation";
import InfoConversationModal from "../../components/modal/InfoConversationModal";
import Pagination from "../../components/pagination/Pagination";

const DashboardHistory = () => {
  const items: ListUniqueConversationItem[] = [
    {
      sender: "whatsapp+62",
      user_id: "a",
    },
  ];

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedUser, setSelectedUser] =
    useState<ListUniqueConversationItem | null>(null);

  const openInfoModal = (info: ListUniqueConversationItem) => {
    setSelectedUser(info);
    setShowInfoModal(true);
  };

  const closeInfoModal = () => {
    setShowInfoModal(false);
    setSelectedUser(null);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  return (
    <div className="flex w-full flex-col gap-y-3">
      <h2 className="text-2xl font-semibold">Riwayat</h2>

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
      </div>

      <DeleteModal id={"a"} onClick={openDeleteModal} value={showDeleteModal} />

      {selectedUser && showInfoModal && (
        <InfoConversationModal
          showModal={showInfoModal}
          onClick={closeInfoModal}
        />
      )}

      <div className="relative w-full shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-100 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Pengirim
              </th>
              <th scope="col" className="px-0.5 py-4">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="px-0.5 py-4">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{item.sender || item.user_id}</td>
                <td
                  className="cursor-pointer px-0.5 py-4"
                  onClick={() => openInfoModal(item)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                    />
                  </svg>
                </td>
                <td
                  className="cursor-pointer px-0.5 py-4"
                  onClick={openDeleteModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />
    </div>
  );
};

export default DashboardHistory;
