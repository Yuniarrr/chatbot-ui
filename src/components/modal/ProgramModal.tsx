import { useState } from "react";
import InputField from "../Input/InputField";

const ProgramModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const modalAddProgram = () => {
    setShowModal(!showModal);
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
                  value={""}
                  //   onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama program"
                />
                <InputField
                  label="Deskripsi Program"
                  id="deskripsiProgram"
                  isTextarea={true}
                  isBase={false}
                  value={""}
                  //   onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan deskripsi program"
                  required={false}
                />
                <InputField
                  label="Penyelenggara Program"
                  id="penyelenggaraProgram"
                  value={""}
                  //   onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama penyelenggara program"
                  required={false}
                />
                <InputField
                  label="Jenis Program"
                  id="jenisProgram"
                  value={""}
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
                  value={""}
                  onChange={(date) => setStartDate(date as Date)}
                  placeholder="Masukkan tanggal dimulai program"
                  required={false}
                />
                <InputField
                  label="Tanggal Selesai Program"
                  id="endProgram"
                  isDate={true}
                  isBase={false}
                  value={""}
                  onChange={(date) => setEndDate(date as Date)}
                  placeholder="Masukkan tanggal selesai program"
                  required={false}
                />
                <InputField
                  label="Link atau URL terkait Program"
                  id="linkProgram"
                  value={""}
                  //   onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan url terkait program"
                  required={false}
                />
                <InputField
                  label="Gambar terkait Program"
                  id="imageProgram"
                  value={""}
                  //   onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan gambar terkait program"
                  required={false}
                />
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Tambah
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramModal;
