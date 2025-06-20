import axiosInstance from "../utils/axiosInstance";

export const getCollections = async (token: string) => {
  try {
    const response = await axiosInstance.get(`/collection/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const updateCollection = async ({
  status,
  collectionId,
  token,
}: {
  status: boolean;
  collectionId: string;
  token: string;
}) => {
  try {
    const response = await axiosInstance.patch(
      `/collection/${collectionId}`,
      {
        status,
      },
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
