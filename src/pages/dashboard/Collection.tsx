import { useEffect, useState } from "react";
import type { CollectionItem } from "../../types/collection";
import DeleteModal from "../../components/modal/DeleteModal";
import UpdateCollectionModal from "../../components/modal/UpdateCollectionModal";
import SearchField from "../../components/Input/SearchField";

const DashboardCollection = () => {
  const items: CollectionItem[] = [
    {
      id: "a",
      collection_name: "administration",
      collection_status: "ACTIVE",
      created_at: "2025-05-06 18:03:15.551948+00",
    },
  ];

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionItem | null>(null);

  const openDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const openEditModal = (user: CollectionItem) => {
    setSelectedCollection(user);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedCollection(null);
  };

  // const { accessToken } = useAuth();
  // const [users, setUsers] = useState<UserItem[]>([]);

  // useEffect(() => {
  //   const getUsers = async () => {
  //     if (!accessToken) return;
  //     try {
  //       const data = await fetchUsers(accessToken);
  //       setUsers(data);
  //     } catch (error) {
  //       console.error("Failed to fetch files:", error);
  //     }
  //   };

  //   getUsers();
  // }, [accessToken]);

  return (
    <div className="flex w-full flex-col gap-y-3">
      <h2 className="text-2xl font-semibold">Dashboard Koleksi</h2>

      <div className="flex max-w-fit flex-col gap-y-3 overflow-x-hidden sm:max-w-full sm:flex-row sm:justify-between sm:gap-y-0">
        <SearchField />

        {/* <UserModal /> */}
      </div>

      <DeleteModal id={"a"} onClick={openDeleteModal} value={showDeleteModal} />

      {selectedCollection && showEditModal && (
        <UpdateCollectionModal
          showModal={showEditModal}
          collection={selectedCollection}
          onClick={closeEditModal}
        />
      )}

      <div className="relative max-w-fit overflow-x-auto shadow-md sm:max-w-full sm:rounded-lg">
        <table className="w-full min-w-[600px] text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-100 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Koleksi
              </th>
              <th scope="col" className="px-6 py-3">
                <span>Status</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="px-6 py-3">
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
                <td className="px-6 py-4">{item.collection_name}</td>
                <td className="px-6 py-4">{item.collection_status}</td>
                <td
                  className="cursor-pointer px-0.5 py-4"
                  onClick={() => openEditModal(item)}
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
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
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

      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">1</span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            10
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            100
          </span>{" "}
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
    </div>
  );
};

export default DashboardCollection;
