import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeFromDate(date) {
  return new Date(date).toLocaleTimeString("en", {
    hourCycle: "h24",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function truncateText(text) {
  if (text.length >= 35) {
    return text.slice(0, 35) + "...";
  } else {
    return text;
  }
}

export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "chat_upload");
  const cloudName = "donueyhp1";

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: false,
    }
  );
  return res.data.secure_url as string;
};
