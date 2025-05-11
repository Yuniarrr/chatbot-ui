import { useParams } from "react-router-dom";
import type { MessageItem } from "../../../types/conversation";
import formatTime from "../../../utils/formatTime";

const ConversationDetail = () => {
  const { id } = useParams();

  const items: MessageItem[] = [
    {
      id: "1",
      created_at: "2025-05-06 18:03:15.551948+00",
      message:
        "hai ai aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      type: "user",
    },
    {
      id: "2",
      created_at: "2025-05-06 18:03:15.551948+00",
      message: "yoo",
      type: "ai",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-y-3">
      <h2 className="text-2xl font-semibold">Riwayat: {id}</h2>

      <div className="">
        <div className="max-h-[80vh] w-full gap-y-3 overflow-y-auto bg-gray-50 p-4 shadow-md sm:rounded-lg">
          {/* {Array(5)
            .fill(null)
            .flatMap(() => items)
            .reverse()
            .map((item, index) => ( */}
          {[...items].reverse().map((item, index) => (
            <div className="mb-3 w-full px-5">
              {item.type === "ai" && (
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
                        {item.type}
                      </span>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {formatTime(item.created_at)}
                      </span>
                    </div>
                    <p className="py-2.5 text-sm font-normal break-all text-gray-900 dark:text-white">
                      {item.message}
                    </p>
                  </div>
                </div>
              )}

              {item.type === "user" && (
                <div
                  className="flex w-full items-start justify-end gap-2.5"
                  id={index.toString()}
                >
                  <div className="flex w-fit flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 leading-1.5 dark:bg-gray-700">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {item.type}
                      </span>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {formatTime(item.created_at)}
                      </span>
                    </div>
                    <p className="block w-full py-2.5 text-sm font-normal break-all text-gray-900 dark:text-white">
                      {item.message}
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
