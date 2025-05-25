import type { IUpdateProgram } from "../types/program";
import axiosInstance from "../utils/axiosInstance";

export const getPrograms = async ({
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
    ? `/opportunity/?skip=${skip}&limit=${limit}&search=${encodeURIComponent(search)}`
    : `/opportunity/?skip=${skip}&limit=${limit}`;

  const response = await axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

export const addNewProgram = async ({
  token,
  title,
  description,
  organizer,
  type,
  start_date,
  end_date,
  link,
  image_url,
}: {
  token: string;
  title: string;
  description: string;
  organizer: string;
  type: string;
  start_date: string | Date | null;
  end_date: string | Date | null;
  link: string;
  image_url: string;
}) => {
  const response = await axiosInstance.post(
    `/opportunity/`,
    {
      title,
      description,
      organizer,
      type,
      start_date,
      end_date,
      link,
      image_url,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data;
};

export const deleteProgram = async (token: string, programId: string) => {
  const response = await axiosInstance.delete(`/opportunity/${programId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateProgram = async ({
  token,
  programId,
  payload,
}: {
  token: string;
  payload: IUpdateProgram;
  programId: string;
}) => {
  try {
    const response = await axiosInstance.patch(
      `/opportunity/${programId}`,
      {
        ...payload,
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
