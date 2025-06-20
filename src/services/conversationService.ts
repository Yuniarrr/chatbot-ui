import axiosInstance from "../utils/axiosInstance";

export const getSenderConversation = async (
  token: string,
  skip = 0,
  limit = 10,
) => {
  try {
    const response = await axiosInstance.get(
      `/conversation?skip=${skip}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const getConversations = async (
  token: string | null,
  param: string,
  skip = 0,
  limit = 10,
) => {
  try {
    const response = await axiosInstance.get(
      `/conversation/${param}?skip=${skip}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const getMessages = async (
  token: string | null,
  conversationId: string,
  skip = 0,
  limit = 10,
) => {
  try {
    const response = await axiosInstance.get(
      `/conversation/message/${conversationId}?skip=${skip}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const deleteConversationById = async (
  token: string,
  conversationId: string,
) => {
  try {
    const response = await axiosInstance.delete(
      `/conversation/${conversationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteConversationBySender = async (
  token: string,
  param: string,
) => {
  try {
    const response = await axiosInstance.delete(
      `/conversation?sender=${param}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};
