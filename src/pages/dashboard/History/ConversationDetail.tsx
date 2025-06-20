import { useNavigate, useParams } from "react-router-dom";
import type { MessageItem } from "../../../types/conversation";
import formatTime from "../../../utils/formatTime";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { getMessages } from "../../../services/conversationService";
import Markdown from "react-markdown";
import type { IPagination } from "../../../types/pagination";
import Pagination from "../../../components/pagination/Pagination";
import getTimeDiff from "../../../utils/getTimeDiff";

const ConversationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { accessToken } = useAuth();
  const [items, setFiles] = useState<MessageItem[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    end: 0,
    is_next: false,
    is_prev: false,
    limit: 10,
    skip: 0,
    start: 0,
    total: 0,
  });

  const onBack = () => {
    return navigate(-1);
  };

  useEffect(() => {
    const getFiles = async () => {
      if (!accessToken || !id) return;
      try {
        const data = await getMessages(
          accessToken,
          id,
          pagination.skip,
          pagination.limit,
        );
        setFiles(data.data);
        setPagination(data.meta);
      } catch (error) {
        console.error("Failed to fetch files:", error);
      }
    };

    getFiles();
  }, [accessToken, id, pagination.limit, pagination.skip]);

  return (
    <div className="flex w-full flex-col gap-y-3">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-x-3">
          <button
            type="submit"
            onClick={onBack}
            className="ms-2 cursor-pointer rounded-lg border border-blue-700 bg-blue-700 p-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
              />
            </svg>

            <span className="sr-only">Search</span>
          </button>
          <div className="flex flex-col gap-y-2">
            <h2 className="text-2xl font-semibold">Riwayat: {id}</h2>
            <h2 className="text-sm">
              Menampilkan detail riwayat percakapan pengguna
            </h2>
          </div>
        </div>
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

      <div className="">
        <div className="max-h-[80vh] w-full gap-y-3 overflow-y-auto bg-gray-50 p-4 shadow-md sm:rounded-lg">
          {items.length === 0 && (
            <div>
              <p>Tidak ada data</p>
            </div>
          )}
          {items.length !== 0 &&
            [...items].map((item, index) => (
              <div className="mb-3 w-full px-5">
                {item.from_message === "BOT" && (
                  <div
                    className="flex w-full items-start gap-2.5"
                    id={index.toString()}
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://png.pngtree.com/png-clipart/20241231/original/pngtree-cute-profile-picture-girl-png-image_18421685.png"
                      alt="Jese image"
                    />
                    <div className="flex w-fit flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 leading-1.5">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900">
                          {item.from_message === "BOT" ? "CATI" : "USER"}
                        </span>
                        <span className="text-sm font-normal text-gray-500">
                          {
                            getTimeDiff(
                              items[index + 1]?.created_at,
                              item.created_at,
                            )?.menitDetik
                          }{" "}
                          - {formatTime(item.created_at)}
                        </span>
                      </div>
                      <p className="py-2.5 text-sm font-normal break-all text-gray-900">
                        <Markdown>{item.message}</Markdown>
                      </p>
                    </div>
                  </div>
                )}

                {item.from_message === "USER" && (
                  <div
                    className="flex w-full items-start justify-end gap-2.5"
                    id={index.toString()}
                  >
                    <div className="flex w-fit flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 leading-1.5">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900">
                          {item.from_message === "USER" ? "USER" : "CATI"}
                        </span>
                        <span className="text-sm font-normal text-gray-500">
                          {formatTime(item.created_at)}
                        </span>
                      </div>
                      <p className="block w-full py-2.5 text-sm font-normal break-all text-gray-900">
                        <Markdown>
                          {(item.file_url
                            ? `![Gambar_${index}](${item.file_url})`
                            : "") + item.message}
                        </Markdown>
                      </p>
                    </div>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://png.pngtree.com/png-clipart/20241231/original/pngtree-cute-profile-picture-girl-png-image_18421685.png"
                      alt="Jese image"
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationDetail;
