import axios, { AxiosError } from "axios";
import { z } from "zod";
import { eventFormSchema } from "@/types/zod/formTypes";

const SERVER_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const getGuestEvents = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/api/event/events`);
    return res.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || "Unknown error";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const createEvent = async (
  eventData: z.infer<typeof eventFormSchema>
) => {
  try {
    const { category, date, location, name, time, description, imagePath } =
      eventData;
    const formData = new FormData();

    formData.append("category", category);
    formData.append("date", date);
    formData.append("location", location);
    formData.append("name", name);
    formData.append("time", time);
    formData.append("image", imagePath);

    if (description) {
      formData.append("description", description);
    }

    const res = await axios.post(`${SERVER_URL}/api/event/create`, formData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || "Unknown error";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getEventData = async (eventId: string) => {
  try {
    const res = await axios.get(`${SERVER_URL}/api/event/get-event/${eventId}`,{withCredentials:true});

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || "Unknown error";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
