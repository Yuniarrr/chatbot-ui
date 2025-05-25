import axiosInstance from "../utils/axiosInstance";

export const getFeedbacks = async ({
  token,
  skip,
  limit,
  search,
}: {
  token: string;
  skip: number;
  limit: number;
  search?: string | null;
}) => {
  const url = search
    ? `/feedback/?skip=${skip}&limit=${limit}&search=${encodeURIComponent(search)}`
    : `/feedback/?skip=${skip}&limit=${limit}`;

  const response = await axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

export const deleteFeedback = async (token: string, feedbackId: string) => {
  const response = await axiosInstance.delete(`/feedback/${feedbackId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
