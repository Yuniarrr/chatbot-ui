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
  start_date: string | Date;
  end_date: string | Date;
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
