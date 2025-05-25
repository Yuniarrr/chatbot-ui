import type React from "react";
import type { IUpdateProgram, ProgramItem } from "../../types/program";
import InputField from "../Input/InputField";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { updateProgram } from "../../services/programService";

interface UpdateProgramModalProps {
  showModal: boolean;
  onClick: () => void;
  program: ProgramItem;
  refetchPrograms: () => Promise<void>;
}

const UpdateProgramModal: React.FC<UpdateProgramModalProps> = ({
  program,
  onClick,
  showModal,
  refetchPrograms,
}) => {
  const { accessToken } = useAuth();

  const [startDate, setStartDate] = useState<Date | null>(
    program.start_date ? new Date(program.start_date) : null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    program.end_date ? new Date(program.end_date) : null,
  );

  const [loading, setLoading] = useState(false);

  const [namaProgram, setNamaProgram] = useState(program.title);
  const [deskripsiProgram, setDeskripsiProgram] = useState(program.description);
  const [penyelenggaraProgram, setPenyelenggaraProgram] = useState(
    program.organizer,
  );
  const [jenisProgram, setJenisProgram] = useState(program.type);
  const [urlProgram, setUrlProgram] = useState(program.link);
  const [imageProgram, setImageProgram] = useState(program.image_url);

  const onUpdateUser = async () => {
    setLoading(true);
    if (!accessToken) return;

    const payload: IUpdateProgram = {};

    if (namaProgram !== program.title) payload.title = namaProgram;
    if (deskripsiProgram !== program.description)
      payload.description = deskripsiProgram;
    if (penyelenggaraProgram !== program.organizer)
      payload.organizer = penyelenggaraProgram;
    if (jenisProgram !== program.type) payload.type = jenisProgram;
    if (urlProgram !== program.link) payload.link = urlProgram;
    if (imageProgram !== program.image_url) payload.image_url = imageProgram;
    if (
      startDate &&
      startDate.toISOString().split("T")[0] !== program.start_date
    )
      payload.start_date = startDate.toISOString().split("T")[0];
    if (endDate && endDate.toISOString().split("T")[0] !== program.start_date)
      payload.end_date = endDate.toISOString().split("T")[0];

    if (Object.keys(payload).length === 0) {
      console.log("Nothing to update.");
      setLoading(false);
      onClick();
      return;
    }

    console.log("payload");
    console.log(payload);

    try {
      await updateProgram({
        payload,
        token: accessToken,
        programId: program.id,
      });
      await refetchPrograms();
    } catch (error) {
      console.error("Failed to update program:", error);
    }
    setLoading(false);
    onClick();
  };

  return (
    <div
      id="dashboardModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex h-full min-h-full items-stretch justify-end overflow-y-auto ${
        showModal ? "" : "hidden"
      }`}
    >
      <div
        className="absolute inset-0 h-full bg-black opacity-50"
        onClick={onClick}
      />

      <div className="relative h-full w-full max-w-4/5 shadow dark:bg-gray-700">
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
                value={penyelenggaraProgram || ""}
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
                label="Jenis Program"
                id="jenisProgram"
                isDropdown={true}
                isBase={false}
                value={jenisProgram}
                onChange={(e) => {
                  if (e && "target" in e) {
                    setJenisProgram((e.target as HTMLInputElement).value);
                  }
                }}
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
                value={urlProgram || ""}
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
                value={imageProgram || ""}
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
              onClick={onUpdateUser}
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                <p>Simpan</p>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProgramModal;
