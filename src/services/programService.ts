import axiosInstance from "../utils/axiosInstance";

export const getPrograms = async (token: string, skip = 0, limit = 10) => {
  const response = await axiosInstance.get(
    `/opportunity?skip=${skip}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data;
};
