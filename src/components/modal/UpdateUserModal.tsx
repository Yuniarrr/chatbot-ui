import { useState } from "react";
import type { IUpdateUser, UserItem } from "../../types/user";
import InputField from "../Input/InputField";
import { useAuth } from "../../contexts/AuthContext";
import { updateUser } from "../../services/userService";

interface UpdateUserModalProps {
  showModal: boolean;
  onClick: () => void;
  user: UserItem;
  refetchUsers: () => Promise<void>;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  showModal,
  user,
  onClick,
  refetchUsers,
}) => {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const [namaLengkap, setNamaLengkap] = useState(user.full_name);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [nomorTelepon, setNomorTelepon] = useState(user.phone_number || "");
  const [role, setRole] = useState(user.role);

  const onUpdateUser = async () => {
    setLoading(true);
    if (!accessToken) return;

    const payload: IUpdateUser = {};

    if (namaLengkap !== user.full_name) payload.full_name = namaLengkap;
    if (email !== user.email) payload.email = email;
    if (password.trim() !== "") payload.password = password;
    if (nomorTelepon !== user.phone_number) payload.phone_number = nomorTelepon;
    if (role !== user.role) payload.role = role;

    if (Object.keys(payload).length === 0) {
      console.log("Nothing to update.");
      setLoading(false);
      onClick();
      return;
    }

    try {
      await updateUser({
        payload,
        token: accessToken,
        user_id: user.id,
      });
      await refetchUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
    setLoading(false);
    onClick();
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

      <div className="relative h-screen w-full max-w-4/5 shadow">
        <div className="relative h-full rounded-l-lg bg-white shadow-sm">
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
            <h3 className="text-xl font-semibold text-gray-900">Data</h3>
            <button
              type="button"
              className="end-2.5 ms-auto inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
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
                label="Nama Lengkap"
                id="namaLengkap"
                value={namaLengkap}
                onChange={(e) => {
                  if (!e || typeof e !== "object") return;
                  if ("target" in e && e.target)
                    setNamaLengkap((e.target as HTMLInputElement).value);
                }}
                placeholder="Masukkan nama lengkapp"
                required={false}
              />
              <InputField
                label="Email"
                id="email"
                value={email}
                onChange={(e) => {
                  if (!e || typeof e !== "object") return;
                  if ("target" in e && e.target)
                    setEmail((e.target as HTMLInputElement).value);
                }}
                placeholder="Masukkan email"
                required={false}
              />
              <InputField
                label="Nomer Telepon"
                id="nomerTelepon"
                value={nomorTelepon}
                onChange={(e) => {
                  if (!e || typeof e !== "object") return;
                  if ("target" in e && e.target)
                    setNomorTelepon((e.target as HTMLInputElement).value);
                }}
                placeholder="Masukkan nomer telepon"
                required={false}
              />
              <InputField
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  if (!e || typeof e !== "object") return;
                  if ("target" in e && e.target)
                    setPassword((e.target as HTMLInputElement).value);
                }}
                placeholder="Masukkan email"
                required={false}
              />
              <InputField
                label="Role"
                id="role"
                isDropdown={true}
                isBase={false}
                value={role}
                onChange={(e) => {
                  if (e && "target" in e) {
                    setRole((e.target as HTMLInputElement).value);
                  }
                }}
                placeholder="Masukkan role"
                listDropdown={[
                  { key: "Pengguna", value: "USER" },
                  { key: "Admin", value: "ADMINISTRATOR" },
                ]}
              />
            </form>
            <button
              onClick={onUpdateUser}
              type="submit"
              className="mt-4 w-full cursor-pointer rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
              {loading ? (
                <svg
                  aria-hidden="true"
                  className="mx-auto h-5 w-5 animate-spin fill-blue-600 text-gray-200"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                <p>Simpan</p>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
