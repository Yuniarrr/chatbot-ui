import { useParams } from "react-router-dom";
import type { MessageItem } from "../../../types/conversation";
import formatTime from "../../../utils/formatTime";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { getMessages } from "../../../services/conversationService";
import Markdown from "react-markdown";

const ConversationDetail = () => {
  const { id } = useParams();

  const { accessToken } = useAuth();
  const [items, setFiles] = useState<MessageItem[]>([]);

  useEffect(() => {
    const getFiles = async () => {
      if (!accessToken || !id) return;
      try {
        const data = await getMessages(accessToken, id);
        setFiles(data.data);
      } catch (error) {
        console.error("Failed to fetch files:", error);
      }
    };

    getFiles();
  }, [accessToken, id]);

  return (
    <div className="flex w-full flex-col gap-y-3">
      <h2 className="text-2xl font-semibold">Riwayat: {id}</h2>

      <div className="">
        <div className="max-h-[80vh] w-full gap-y-3 overflow-y-auto bg-gray-50 p-4 shadow-md sm:rounded-lg">
          {[...items].map((item, index) => (
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
                  <div className="flex w-fit flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 leading-1.5 dark:bg-gray-700">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {item.from_message === "BOT" ? "CATI" : "USER"}
                      </span>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {formatTime(item.created_at)}
                      </span>
                    </div>
                    <p className="py-2.5 text-sm font-normal break-all text-gray-900 dark:text-white">
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
                  <div className="flex w-fit flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 leading-1.5 dark:bg-gray-700">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {item.from_message === "USER" ? "USER" : "CATI"}
                      </span>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {formatTime(item.created_at)}
                      </span>
                    </div>
                    <p className="block w-full py-2.5 text-sm font-normal break-all text-gray-900 dark:text-white">
                      <Markdown>{item.message}</Markdown>
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
