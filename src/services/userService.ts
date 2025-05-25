import type { IUpdateUser } from "../types/user";
import axiosInstance from "../utils/axiosInstance";

export const getUsers = async ({
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
  try {
    const url = search
      ? `/user/?skip=${skip}&limit=${limit}&search=${encodeURIComponent(search)}`
      : `/user/?skip=${skip}&limit=${limit}`;

    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

export const updateUser = async ({
  token,
  user_id,
  payload,
}: {
  token: string;
  payload: IUpdateUser;
  user_id: string;
}) => {
  try {
    const response = await axiosInstance.patch(
      `/user/${user_id}`,
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
