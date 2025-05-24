import axiosInstance from "../utils/axiosInstance";

export const getSenderConversation = async (
  token: string,
  skip = 0,
  limit = 10,
) => {
  const response = await axiosInstance.get(
    `/conversation?skip=${skip}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data;
};

export const getConversations = async (
  token: string | null,
  param: string,
  skip = 0,
  limit = 10,
) => {
  console.log("param");
  console.log(param);
  const response = await axiosInstance.get(
    `/conversation/${param}?skip=${skip}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data;
};

export const getMessages = async (
  token: string | null,
  conversationId: string,
  skip = 0,
  limit = 10,
) => {
  console.log("param");
  console.log(conversationId);
  const response = await axiosInstance.get(
    `/conversation/message/${conversationId}?skip=${skip}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data;
};
