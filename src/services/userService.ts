import axiosInstance from "../utils/axiosInstance";

export const getUsers = async (token: string, skip = 0, limit = 10) => {
  const response = await axiosInstance.get(
    `/user/?skip=${skip}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data;
};
