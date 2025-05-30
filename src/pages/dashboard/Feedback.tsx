import { useCallback, useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import DeleteModal from "../../components/modal/DeleteModal";
import SearchField from "../../components/Input/SearchField";
import { useAuth } from "../../contexts/AuthContext";
import type { IPagination } from "../../types/pagination";
import type { FeedbackItem } from "../../types/feedback";
import { deleteFeedback, getFeedbacks } from "../../services/feedbackService";

const DashboardFeedback = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FeedbackItem | null>(null);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState("");
  const [search, setSearch] = useState("");

  const openDeleteModal = (item: FeedbackItem) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedItem(null);
    setShowDeleteModal(false);
  };

  const { accessToken } = useAuth();
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    end: 0,
    is_next: false,
    is_prev: false,
    limit: 10,
    skip: 0,
    start: 0,
    total: 0,
  });

  const fetchFeedbacks = useCallback(async () => {
    if (!accessToken) return;
    try {
      const data = await getFeedbacks({
        limit: pagination.limit,
        skip: pagination.skip,
        token: accessToken,
        search: search === "" ? undefined : search,
      });
      setFeedbacks(data.data);
      setPagination(data.meta);
    } catch (error) {
      console.error("Failed to fetch programs:", error);
    }
  }, [accessToken, pagination.limit, pagination.skip, search]);

  const onDeleteFeedback = async () => {
    setLoading(true);
    if (!accessToken) return;
    if (selectedFeedbackId === "") return;
    try {
      await deleteFeedback(accessToken, selectedFeedbackId);
      await fetchFeedbacks();
    } catch (error) {
      console.error("Failed to delete program:", error);
    }
    setLoading(false);
    setShowDeleteModal(false);
    setSelectedFeedbackId("");
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  return (
    <div className="flex w-full flex-col gap-y-3">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-2xl font-semibold">Dashboard Umpan Balik</h2>
        <h2 className="text-sm">
          Menampilkan seluruh kritik dan saran dari pengguna chatbot
        </h2>
      </div>

      <div className="flex max-w-fit flex-col gap-y-3 overflow-x-hidden sm:max-w-full sm:flex-row sm:justify-between sm:gap-y-0">
        <SearchField
          value={search}
          onChange={(e) => {
            if (e && "target" in e) {
              setSearch((e.target as HTMLInputElement).value);
            }
          }}
          onSearch={fetchFeedbacks}
          isLoading={loading}
        />
      </div>

      {selectedItem && showDeleteModal && (
        <DeleteModal
          onCancel={closeDeleteModal}
          value={showDeleteModal}
          onConfirm={onDeleteFeedback}
          isLoading={loading}
        />
      )}

      {feedbacks.length === 0 && (
        <div>
          <p>Tidak ada data</p>
        </div>
      )}

      {feedbacks.length !== 0 && (
        <div className="relative max-w-fit overflow-x-auto shadow-md sm:max-w-full sm:rounded-lg">
          <table className="w-full min-w-[600px] text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="bg-gray-100 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Pengirim
                </th>
                <th scope="col" className="px-6 py-3">
                  Jenis
                </th>
                <th scope="col" className="px-6 py-3">
                  Pesan
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((item, index) => (
                <tr className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
                  >
                    {index + 1 + pagination.skip}
                  </th>
                  <td className="px-6 py-4 hover:cursor-pointer hover:underline">
                    {item.sender}
                  </td>
                  <td
                    className={`px-6 py-4 font-semibold ${item.type === "POSITIVE" ? "text-green-400" : "text-red-400"}`}
                  >
                    {item.type === "POSITIVE" ? "Positif" : "Negatif"}
                  </td>
                  <td className="px-6 py-4">{item.message}</td>
                  <td
                    className="cursor-pointer px-0.5 py-4"
                    onClick={async () => {
                      openDeleteModal(item);
                      setSelectedFeedbackId(item.id);
                    }}
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
      )}

      <Pagination
        pagination={pagination}
        onPageChange={(newSkip) => {
          setPagination((prev) => ({
            ...prev,
            skip: newSkip,
          }));
        }}
      />
    </div>
  );
};

export default DashboardFeedback;
