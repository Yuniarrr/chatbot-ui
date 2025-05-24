import { useEffect, useState } from "react";
import DeleteModal from "../../components/modal/DeleteModal";
import type {
  ConversationItem,
  ListUniqueConversationItem,
} from "../../types/conversation";
import InfoConversationModal from "../../components/modal/InfoConversationModal";
import Pagination from "../../components/pagination/Pagination";
import SearchField from "../../components/Input/SearchField";
import { useAuth } from "../../contexts/AuthContext";
import {
  getConversations,
  getSenderConversation,
} from "../../services/conversationService";
import type { IPagination } from "../../types/pagination";

const DashboardHistory = () => {
  // const items: ListUniqueConversationItem[] = [
  //   {
  //     sender: "whatsapp+62",
  //     user_id: "a",
  //   },
  // ];

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedUser, setSelectedUser] =
    useState<ListUniqueConversationItem | null>(null);

  const [conversations, setConversations] = useState<ConversationItem | null>(
    null,
  );

  const getConv = async (param: string) => {
    if (!accessToken) return;
    try {
      const data = await getConversations(accessToken, param);
      setConversations(data.data);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };

  const openInfoModal = async (info: ListUniqueConversationItem) => {
    await getConv(info.user_id || info.sender || "");
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

  const { accessToken } = useAuth();
  const [listConversations, setListConversations] = useState<
    ListUniqueConversationItem[]
  >([]);
  const [pagination, setPagination] = useState<IPagination>({
    end: 0,
    is_next: false,
    is_prev: false,
    limit: 10,
    skip: 0,
    start: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchConversations = async () => {
      if (!accessToken) return;
      try {
        const data = await getSenderConversation(
          accessToken,
          pagination.skip,
          pagination.limit,
        );
        setListConversations(data.data);
        setPagination(data.meta);
      } catch (error) {
        console.error("Failed to fetch files:", error);
      }
    };

    fetchConversations();
  }, [accessToken, pagination.limit, pagination.skip]);

  return (
    <div className="flex w-full flex-col gap-y-3">
      <h2 className="text-2xl font-semibold">Riwayat</h2>

      <div className="flex max-w-fit flex-col gap-y-3 overflow-x-hidden sm:max-w-full sm:flex-row sm:justify-between sm:gap-y-0">
        <SearchField />
      </div>

      <DeleteModal id={"a"} onClick={openDeleteModal} value={showDeleteModal} />

      {selectedUser && showInfoModal && (
        <InfoConversationModal
          showModal={showInfoModal}
          onClick={closeInfoModal}
          conversations={conversations}
        />
      )}

      {listConversations.length === 0 && (
        <div>
          <p>Tidak ada data</p>
        </div>
      )}

      {listConversations.length !== 0 && (
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
                  <span className="sr-only">Edit</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {listConversations.map((item, index) => (
                <tr className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
                  >
                    {index + 1 + pagination.skip}
                  </th>
                  <td className="px-6 py-4">{item.sender || item.full_name}</td>
                  <td
                    className="cursor-pointer px-0.5 py-4"
                    onClick={async () => {
                      await openInfoModal(item);
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

export default DashboardHistory;
