import { useCallback, useEffect, useState } from "react";
import type { ProgramItem } from "../../types/program";
import Pagination from "../../components/pagination/Pagination";
import DeleteModal from "../../components/modal/DeleteModal";
import UpdateProgramModal from "../../components/modal/UpdateProgramModal";
import SearchField from "../../components/Input/SearchField";
import ProgramModal from "../../components/modal/ProgramModal";
import { useAuth } from "../../contexts/AuthContext";
import { deleteProgram, getPrograms } from "../../services/programService";
import type { IPagination } from "../../types/pagination";

const DashboardProgram = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ProgramItem | null>(null);
  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [search, setSearch] = useState("");

  const openEditModal = (item: ProgramItem) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedItem(null);
  };

  const openDeleteModal = (item: ProgramItem) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedItem(null);
    setShowDeleteModal(false);
  };

  const { accessToken } = useAuth();
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    end: 0,
    is_next: false,
    is_prev: false,
    limit: 10,
    skip: 0,
    start: 0,
    total: 0,
  });

  const fetchPrograms = useCallback(async () => {
    if (!accessToken) return;
    try {
      const data = await getPrograms({
        limit: pagination.limit,
        skip: pagination.skip,
        token: accessToken,
        search: search === "" ? undefined : search,
      });
      setPrograms(data.data);
      setPagination(data.meta);
    } catch (error) {
      console.error("Failed to fetch programs:", error);
    }
  }, [accessToken, pagination.limit, pagination.skip, search]);

  const onDeleteProgram = async () => {
    setLoading(true);
    if (!accessToken) return;
    if (selectedProgramId === "") return;
    try {
      await deleteProgram(accessToken, selectedProgramId);
      await fetchPrograms();
    } catch (error) {
      console.error("Failed to delete program:", error);
    }
    setLoading(false);
    setShowDeleteModal(false);
    setSelectedProgramId("");
  };

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  return (
    <div className="flex w-full flex-col gap-y-3">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-2xl font-semibold">Dashboard Program</h2>
        <h2 className="text-sm">
          Mengelola program, seperti seminar, magang, beasiswa, lomba dan
          sertifikasi
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
          onSearch={fetchPrograms}
          isLoading={loading}
        />

        <ProgramModal refetchPrograms={fetchPrograms} />
      </div>

      {selectedItem && showDeleteModal && (
        <DeleteModal
          onCancel={closeDeleteModal}
          value={showDeleteModal}
          onConfirm={onDeleteProgram}
          isLoading={loading}
        />
      )}

      {selectedItem && showEditModal && (
        <UpdateProgramModal
          showModal={showEditModal}
          program={selectedItem}
          onClick={closeEditModal}
          refetchPrograms={fetchPrograms}
        />
      )}

      {programs.length === 0 && (
        <div>
          <p>Tidak ada data</p>
        </div>
      )}

      {programs.length !== 0 && (
        <div className="relative max-w-fit overflow-x-auto shadow-md sm:max-w-full sm:rounded-lg">
          <table className="w-full min-w-[600px] text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="bg-gray-100 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama Program
                </th>
                <th scope="col" className="px-6 py-3">
                  Kategori
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
              {programs.map((item, index) => (
                <tr className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
                  >
                    {index + 1 + pagination.skip}
                  </th>
                  <td className="px-6 py-4 hover:cursor-pointer hover:underline">
                    {item.title}
                  </td>
                  <td className="px-6 py-4">{item.type}</td>
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
                    onClick={async () => {
                      openDeleteModal(item);
                      setSelectedProgramId(item.id);
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

export default DashboardProgram;
