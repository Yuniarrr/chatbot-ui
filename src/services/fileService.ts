import type { IUpdateFile } from "../types/file";
import axiosInstance from "../utils/axiosInstance";

export const getFiles = async (token: string, skip = 0, limit = 10) => {
  const response = await axiosInstance.get(
    `/file/?skip=${skip}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data;
};

export const uploadFile = async ({
  file,
  token,
  content,
  url,
  collection_name,
}: {
  file?: File | null;
  content?: string | null;
  url?: string | null;
  token: string;
  collection_name: string;
}) => {
  const formData = new FormData();
  if (file) {
    formData.append("file", file);
  } else if (content) {
    formData.append("content", content);
  } else if (url) {
    formData.append("url", url);
  }

  formData.append("collection_name", collection_name);

  try {
    const response = await axiosInstance.post(`/file/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

export const deleteFile = async (token: string, fileId: string) => {
  try {
    const response = await axiosInstance.delete(
      `/file/${fileId}?delete_file=true`,
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

export const updateFile = async ({
  token,
  file_id,
  payload,
}: {
  token: string;
  payload: IUpdateFile;
  file_id: string;
}) => {
  try {
    const response = await axiosInstance.patch(
      `/file/${file_id}`,
      {
        ...payload,
      },
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
