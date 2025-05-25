import axiosInstance from "../utils/axiosInstance";

export const getFeedbacks = async (token: string, skip = 0, limit = 10) => {
  const response = await axiosInstance.get(
    `/feedback?skip=${skip}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

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
