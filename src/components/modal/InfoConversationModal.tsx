import type { ConversationItem } from "../../types/conversation";
import Pagination from "../../components/pagination/Pagination";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface InfoConversationModalProps {
  showModal: boolean;
  onClick: () => void;
}

const InfoConversationModal: React.FC<InfoConversationModalProps> = ({
  showModal,
  onClick,
}) => {
  const items: ConversationItem[] = [
    {
      id: "a",
      title: "hai",
      sender: "wa",
      user_id: "a",
      created_at: "2025-05-06 18:03:15.551948+00",
      updated_at: null,
    },
  ];

  const navigate = useNavigate();

  const openConversationDetail = (id: string) => {
    return navigate(`/dashboard/history/${id}`);
  };

  return (
    <div
      id="dashboardModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex items-center justify-end overflow-y-auto ${
        showModal ? "" : "hidden"
      }`}
    >
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClick} />

      <div className="relative h-screen w-full max-w-4/5 shadow dark:bg-gray-700">
        <div className="relative h-full rounded-l-lg bg-white shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Daftar Percakapan
            </h3>
            <button
              type="button"
              className="end-2.5 ms-auto inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="dashboardModal"
              onClick={onClick}
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

          <div className="mb-5 p-5 shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="bg-gray-100 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Judul
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
                    <td className="px-6 py-4">{item.title}</td>
                    <td
                      className="cursor-pointer px-0.5 py-4"
                      onClick={() => openConversationDetail(item.id)}
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
                      //   onClick={openDeleteModal}
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
      </div>
    </div>
  );
};

export default InfoConversationModal;
