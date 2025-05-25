import { useCallback, useEffect, useState } from "react";
import type { CollectionItem } from "../../types/collection";
import UpdateCollectionModal from "../../components/modal/UpdateCollectionModal";
import { getCollections } from "../../services/collectionService";
import { useAuth } from "../../contexts/AuthContext";

const DashboardCollection = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionItem | null>(null);

  const openEditModal = (user: CollectionItem) => {
    setSelectedCollection(user);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedCollection(null);
  };

  const { accessToken } = useAuth();
  const [collections, setCollections] = useState<CollectionItem[]>([]);

  const fetchCollection = useCallback(async () => {
    if (!accessToken) return;
    try {
      const data = await getCollections(accessToken);
      setCollections(data.data);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  return (
    <div className="flex w-full flex-col gap-y-3">
      <h2 className="text-2xl font-semibold">Dashboard Jenis Dokumen</h2>

      {selectedCollection && showEditModal && (
        <UpdateCollectionModal
          showModal={showEditModal}
          collection={selectedCollection}
          onClick={closeEditModal}
          refetchCollection={fetchCollection}
        />
      )}

      {collections.length === 0 && (
        <div>
          <p>Tidak ada data</p>
        </div>
      )}

      {collections.length !== 0 && (
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
                {/* <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Delete</span>
                </th> */}
              </tr>
            </thead>
            <tbody>
              {collections.map((item, index) => (
                <tr className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">
                    {item.is_active ? "AKTIF" : "NON-AKTIF"}
                  </td>
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
                  {/* <td
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
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardCollection;
