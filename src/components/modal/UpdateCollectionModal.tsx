import type { CollectionItem } from "../../types/collection";
import InputField from "../Input/InputField";

interface UpdateCollectionModalProps {
  showModal: boolean;
  onClick: () => void;
  collection: CollectionItem;
}

const UpdateCollectionModal: React.FC<UpdateCollectionModalProps> = ({
  showModal,
  collection,
  onClick,
}) => {
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
              Data
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

          <div className="p-4 md:p-5">
            <form className="space-y-4" action="#">
              <InputField
                label="Nama Koleksi"
                id="collectionName"
                value={collection.collection_name}
                //   onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama koleksi"
              />
              <InputField
                label="Status"
                id="status"
                value={collection.collection_status}
                isDropdown={true}
                isBase={false}
                //   onChange={(e) => setName(e.target.value)}
                placeholder="Pilih status"
                listDropdown={[
                  { key: "Aktif", value: "ACTIVE" },
                  { key: "Non-Aktif", value: "NON-ACTIVE" },
                ]}
              />
              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Simpan
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCollectionModal;
