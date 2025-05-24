import axiosInstance from "../utils/axiosInstance";

export const getCollections = async (token: string) => {
  const response = await axiosInstance.get(`/collection/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};
