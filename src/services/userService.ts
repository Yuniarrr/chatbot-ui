import axiosInstance from "../utils/axiosInstance";

export const getUsers = async (token: string, skip = 0, limit = 10) => {
  try {
    const response = await axiosInstance.get(
      `/user/?skip=${skip}&limit=${limit}`,
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

export const createNewUser = async ({
  token,
  full_name,
  phone_number,
  role,
  email,
  password,
}: {
  token: string;
  full_name: string;
  phone_number: string | null;
  role: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post(
      `/user`,
      {
        full_name,
        phone_number,
        role,
        email,
        password,
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

export const deleteUser = async (token: string, userId: string) => {
  try {
    const response = await axiosInstance.delete(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
