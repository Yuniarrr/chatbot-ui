import { useState } from "react";
import InputField from "../Input/InputField";
import { addNewProgram } from "../../services/programService";
import { useAuth } from "../../contexts/AuthContext";

interface ProgramModalProps {
  refetchPrograms: () => Promise<void>;
}

const ProgramModal: React.FC<ProgramModalProps> = ({ refetchPrograms }) => {
  const { accessToken } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [namaProgram, setNamaProgram] = useState("");
  const [deskripsiProgram, setDeskripsiProgram] = useState("");
  const [penyelenggaraProgram, setPenyelenggaraProgram] = useState("");
  const [jenisProgram, setJenisProgram] = useState("");
  const [urlProgram, setUrlProgram] = useState("");
  const [imageProgram, setImageProgram] = useState("");

  const modalAddProgram = () => {
    setShowModal(!showModal);
  };

  const fetchNewProgram = async () => {
    setLoading(true);
    if (!accessToken) return;
    try {
      console.log("startDate");
      console.log(startDate);
      await addNewProgram({
        token: accessToken,
        description: deskripsiProgram,
        end_date: endDate ? endDate.toISOString().split("T")[0] : null,
        image_url: imageProgram,
        link: urlProgram,
        organizer: penyelenggaraProgram,
        start_date: startDate ? startDate.toISOString().split("T")[0] : null,
        title: namaProgram,
        type: jenisProgram,
      });
      await refetchPrograms();
    } catch (error) {
      console.error("Failed to fetch new user:", error);
    }
    setNamaProgram("");
    setDeskripsiProgram("");
    setPenyelenggaraProgram("");
    setJenisProgram("");
    setUrlProgram("");
    setImageProgram("");
    setShowModal(false);
    setLoading(false);
  };

  return (
    <div className="h-full max-w-full">
      <button
        className="flex cursor-pointer flex-row items-center justify-center gap-x-2 rounded-lg bg-blue-700 px-3 py-2 hover:bg-blue-800 sm:ms-2"
        data-modal-target="dashboardModal"
        data-modal-toggle="dashboardModal"
        type="button"
        onClick={modalAddProgram}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="white"
          className="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <p className="font-semibold text-white">Tambah Program Baru</p>
      </button>

      <div
        id="dashboardModal"
        tabIndex={-1}
        aria-hidden="true"
        // className="fixed top-0 right-0 left-0 z-50 h-[calc(100%)] max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto bg-black md:inset-0"
        className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto ${
          showModal ? "" : "hidden"
        }`}
      >
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={modalAddProgram}
        />

        <div className="relative max-w-2xl overflow-y-auto rounded-lg p-4 shadow sm:h-full sm:w-full sm:overflow-y-hidden dark:bg-gray-700">
          <div className="relative rounded-lg bg-white shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Tambah Program Baru
              </h3>
              <button
                type="button"
                className="end-2.5 ms-auto inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="dashboardModal"
                onClick={modalAddProgram}
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
                  label="Nama Program"
                  id="namaProgram"
                  value={namaProgram}
                  onChange={(e) => {
                    if (!e || typeof e !== "object") return;
                    if ("target" in e && e.target)
                      setNamaProgram((e.target as HTMLInputElement).value);
                  }}
                  placeholder="Masukkan nama program"
                />
                <InputField
                  label="Deskripsi Program"
                  id="deskripsiProgram"
                  isTextarea={true}
                  isBase={false}
                  value={deskripsiProgram}
                  onChange={(e) => {
                    if (!e || typeof e !== "object") return;
                    if ("target" in e && e.target)
                      setDeskripsiProgram((e.target as HTMLInputElement).value);
                  }}
                  placeholder="Masukkan deskripsi program"
                  required={false}
                />
                <InputField
                  label="Penyelenggara Program"
                  id="penyelenggaraProgram"
                  value={penyelenggaraProgram}
                  onChange={(e) => {
                    if (!e || typeof e !== "object") return;
                    if ("target" in e && e.target)
                      setPenyelenggaraProgram(
                        (e.target as HTMLInputElement).value,
                      );
                  }}
                  placeholder="Masukkan nama penyelenggara program"
                  required={false}
                />
                <InputField
                  label="Kategori Program"
                  id="jenisProgram"
                  value={jenisProgram}
                  onChange={(e) => {
                    if (e && "target" in e) {
                      setJenisProgram((e.target as HTMLInputElement).value);
                    }
                  }}
                  isDropdown={true}
                  isBase={false}
                  placeholder="Pilih program"
                  listDropdown={[
                    { key: "Beasiswa", value: "BEASISWA" },
                    { key: "Magang", value: "MAGANG" },
                    { key: "Lomba", value: "LOMBA" },
                    { key: "Sertifikasi", value: "SERTIFIKASI" },
                    { key: "Seminar", value: "SEMINAR" },
                  ]}
                />
                <InputField
                  label="Tanggal Dimulai Program"
                  id="startProgram"
                  isDate={true}
                  isBase={false}
                  value={startDate}
                  onChange={(date) => setStartDate(date as Date)}
                  placeholder="Masukkan tanggal dimulai program"
                  required={false}
                />
                <InputField
                  label="Tanggal Selesai Program"
                  id="endProgram"
                  isDate={true}
                  isBase={false}
                  value={endDate}
                  onChange={(date) => setEndDate(date as Date)}
                  placeholder="Masukkan tanggal selesai program"
                  required={false}
                />
                <InputField
                  label="Link atau URL terkait Program"
                  id="linkProgram"
                  value={urlProgram}
                  onChange={(e) => {
                    if (!e || typeof e !== "object") return;
                    if ("target" in e && e.target)
                      setUrlProgram((e.target as HTMLInputElement).value);
                  }}
                  placeholder="Masukkan url terkait program"
                  required={false}
                />
                <InputField
                  label="Gambar terkait Program"
                  id="imageProgram"
                  value={imageProgram}
                  onChange={(e) => {
                    if (!e || typeof e !== "object") return;
                    if ("target" in e && e.target)
                      setImageProgram((e.target as HTMLInputElement).value);
                  }}
                  placeholder="Masukkan gambar terkait program"
                  required={false}
                />
              </form>
              <button
                type="submit"
                className={`mt-4 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={async () => await fetchNewProgram()}
              >
                {loading ? (
                  <svg
                    aria-hidden="true"
                    className="mx-auto h-5 w-5 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
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
                  <p>Tambah</p>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramModal;
