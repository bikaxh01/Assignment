import { signInformSchema, signUpformSchema } from "@/types/zod/formTypes";
import axios, { AxiosError } from "axios";
import { z } from "zod";

const SERVER_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const registerUser = async (
  userData: z.infer<typeof signUpformSchema>
) => {
  try {
    const res = await axios.post(`${SERVER_URL}/api/user/register`, {
      ...userData,
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
export const signInUser = async (
  userData: z.infer<typeof signInformSchema>
) => {
  try {
    const res = await axios.post(
      `${SERVER_URL}/api/user/login`,
      { ...userData },
      { withCredentials: true }
    );
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

export const getUserData = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/api/user/get-user`,{withCredentials:true});
    return res.data.data;
  } catch (error: unknown) {
    return null;
  }
};
