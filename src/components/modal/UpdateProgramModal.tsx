import type React from "react";
import type { ProgramItem } from "../../types/program";
import InputField from "../Input/InputField";
import { useState } from "react";

interface UpdateProgramModalProps {
  showModal: boolean;
  onClick: () => void;
  program: ProgramItem;
}

const UpdateProgramModal: React.FC<UpdateProgramModalProps> = ({
  program,
  onClick,
  showModal,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

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
                value={program.title}
                //   onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama program"
              />
              <InputField
                label="Deskripsi Program"
                id="deskripsiProgram"
                isTextarea={true}
                isBase={false}
                value={program.description}
                //   onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan deskripsi program"
                required={false}
              />
              <InputField
                label="Penyelenggara Program"
                id="penyelenggaraProgram"
                value={program.organizer || ""}
                //   onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama penyelenggara program"
                required={false}
              />
              <InputField
                label="Jenis Program"
                id="jenisProgram"
                value={program.type}
                isDropdown={true}
                isBase={false}
                //   onChange={(e) => setName(e.target.value)}
                placeholder="Pilih program"
                listDropdown={[
                  { key: "Beasiswa", value: "BEASISWA" },
                  { key: "Magang", value: "MAGANG" },
                  { key: "Lomba", value: "LOMBA" },
                  { key: "Sertifikasi", value: "SERTIFIKASI" },
                ]}
              />
              <InputField
                label="Tanggal Dimulai Program"
                id="startProgram"
                isDate={true}
                isBase={false}
                value={program.start_date || ""}
                onChange={(date) => setStartDate(date as Date)}
                placeholder="Masukkan tanggal dimulai program"
                required={false}
              />
              <InputField
                label="Tanggal Selesai Program"
                id="endProgram"
                isDate={true}
                isBase={false}
                value={program.end_date || ""}
                onChange={(date) => setEndDate(date as Date)}
                placeholder="Masukkan tanggal selesai program"
                required={false}
              />
              <InputField
                label="Link atau URL terkait Program"
                id="linkProgram"
                value={program.link || ""}
                //   onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan url terkait program"
                required={false}
              />
              <InputField
                label="Gambar terkait Program"
                id="imageProgram"
                value={program.image_url || ""}
                //   onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan gambar terkait program"
                required={false}
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

export default UpdateProgramModal;
