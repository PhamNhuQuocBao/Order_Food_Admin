import axios from "axios";

export const APIs = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

export const cloudinaryConfig = {
  cloudName: "dx5wheahz",
  uploadPreset: "mlusmkhs",
};
