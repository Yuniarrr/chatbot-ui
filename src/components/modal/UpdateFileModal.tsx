import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
// import workerSrc from "pdfjs-dist/build/pdf.worker.min.js?url";
import InputField from "../Input/InputField";
import formatTime from "../../utils/formatTime";
import type { FileItem } from "../../types/file";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url,
// ).toString();
// pdfjs.GlobalWorkerOptions.workerSrc = "/assets/pdf.worker.min.mjs";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface UpdateFileModalProps {
  showModal: boolean;
  onClick: () => void;
  file: FileItem;
}

const UpdateFileModal: React.FC<UpdateFileModalProps> = ({
  showModal,
  file,
  onClick,
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);

  const filePath = `http://localhost:8080/api/v1/dev/uploads/${file.file_name}`;

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    console.log("PDF page count:", numPages);
    setNumPages(numPages);
  }

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

          <div className="flex max-w-full flex-row">
            <div className="w-1/2 p-4 md:p-5">
              <form className="space-y-4" action="#">
                <InputField
                  label="Nama File"
                  id="namaFile"
                  value={file.meta.name}
                  //   onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama file"
                />
                <InputField
                  label="Kategori File"
                  id="kategoriFile"
                  value={file.meta.collection_name}
                  //   onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama grup"
                />
                <InputField
                  label="Status File"
                  id="statusFile"
                  value={file.status}
                  //   onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama file"
                  disabled={true}
                />
                <InputField
                  label="Tanggal Upload"
                  id="tglUpload"
                  value={formatTime(file.created_at)}
                  //   onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama file"
                  disabled={true}
                />
                <InputField
                  label="Tanggal Update"
                  id="tglUpdate"
                  value={file.updated_at ? formatTime(file.updated_at) : ""}
                  //   onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama file"
                  disabled={true}
                />
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Simpan
                </button>
              </form>
            </div>
            <div className="mx-auto max-h-[80vh] w-1/2 overflow-y-auto rounded-lg border-2 border-gray-300 bg-gray-50 p-4">
              <Document
                file={filePath}
                onLoadSuccess={onDocumentLoadSuccess}
                className="flex flex-col items-center"
              >
                {Array.from(new Array(numPages), (_, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="my-4 shadow-md"
                  />
                ))}
              </Document>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateFileModal;
