import axiosInstance from "../utils/axiosInstance";

export const getCollections = async (token: string, skip = 0, limit = 10) => {
  const response = await axiosInstance.get(`/collection/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};
