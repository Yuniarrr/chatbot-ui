import { useCallback, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import InputField from "../Input/InputField";
import formatTime from "../../utils/formatTime";
import type { FileItem, IUpdateFile } from "../../types/file";
import { useAuth } from "../../contexts/AuthContext";
import type { CollectionItem } from "../../types/collection";
import { getCollections } from "../../services/collectionService";
import { updateFile } from "../../services/fileService";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface UpdateFileModalProps {
  showModal: boolean;
  onClick: () => void;
  file: FileItem;
  refetchFile: () => Promise<void>;
}

const UpdateFileModal: React.FC<UpdateFileModalProps> = ({
  showModal,
  file,
  onClick,
  refetchFile,
}) => {
  const { accessToken } = useAuth();
  const [numPages, setNumPages] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const filePath = `http://localhost:8080/api/v1/dev/uploads/${file.file_name}`;

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [selectedCollection, setSelectedCollection] = useState(
    file.meta.collection_name,
  );

  const [namaFile, setNamaFile] = useState(
    file.meta.name.replace(/\.[^/.]+$/, ""),
  );

  const fetchCollection = useCallback(async () => {
    if (!accessToken) return;
    try {
      const data = await getCollections(accessToken);
      setCollections(data.data);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  }, [accessToken]);

  const onUpdateFile = async () => {
    setLoading(true);
    if (!accessToken) return;

    const payload: IUpdateFile = {
      meta: file.meta,
      file_name: file.file_name,
    };

    if (namaFile !== file.meta.name.replace(/\.[^/.]+$/, ""))
      payload.file_name = `${file.id}_${namaFile}.${file.meta.name.split(".").pop()}`;
    if (selectedCollection !== file.meta.collection_name)
      payload.meta.collection_name = selectedCollection;

    if (Object.keys(payload).length === 0) {
      console.log("Nothing to update.");
      setLoading(false);
      onClick();
      return;
    }

    try {
      console.log(payload);
      // await updateFile({
      //   token: accessToken,
      //   payload,
      //   file_id: file.id,
      // });
      await refetchFile();
    } catch (error) {
      console.error("Failed to update files:", error);
    }

    setLoading(false);
    onClick();
  };

  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

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
            <div className="w-full p-4 sm:w-1/2 md:p-5">
              <form className="space-y-4" action="#">
                <InputField
                  label="Nama Dokumen"
                  id="namaFile"
                  value={namaFile}
                  onChange={(e) => {
                    if (!e || typeof e !== "object") return;
                    if ("target" in e && e.target)
                      setNamaFile((e.target as HTMLInputElement).value);
                  }}
                  placeholder="Masukkan nama file"
                />
                <InputField
                  label="Jenis Dokumen"
                  id="kategoriFile"
                  isDropdown={true}
                  isBase={false}
                  value={selectedCollection}
                  onChange={(e) => {
                    if (e && "target" in e) {
                      setSelectedCollection(
                        (e.target as HTMLInputElement).value,
                      );
                    }
                  }}
                  listDropdown={collections.map((c) => ({
                    key: c.name,
                    value: c.name,
                  }))}
                  placeholder="Masukkan jenis dokumen"
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
              </form>
              <button
                type="submit"
                onClick={onUpdateFile}
                className="mt-4 w-full cursor-pointer rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            <div className="mx-auto hidden max-h-[80vh] w-1/2 overflow-y-auto rounded-lg border-2 border-gray-300 bg-gray-50 p-4 sm:block">
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
