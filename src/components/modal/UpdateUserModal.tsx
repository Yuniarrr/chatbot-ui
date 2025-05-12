import type { UserItem } from "../../types/user";
import InputField from "../Input/InputField";

interface UpdateUserModalProps {
  showModal: boolean;
  onClick: () => void;
  user: UserItem;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  showModal,
  user,
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
                label="Email"
                id="email"
                value={user.email}
                //   onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan email"
              />
              <InputField
                label="Password"
                id="password"
                type="password"
                value={""}
                //   onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan email"
              />
              <InputField
                label="Nama Lengkap"
                id="namaLengkap"
                value={user.full_name}
                //   onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkapp"
              />
              <InputField
                label="Nomer Telepon"
                id="nomerTelepon"
                value={user.phone_number ?? ""}
                //   onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nomer telepon"
              />
              <InputField
                label="Role"
                id="role"
                value={user.role}
                isDropdown={true}
                isBase={false}
                //   onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan role"
                listDropdown={[
                  { key: "Pengguna", value: "USER" },
                  { key: "Admin", value: "ADMINISTRATOR" },
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

export default UpdateUserModal;
