import axios from "axios";

export const APIs = axios.create({
  baseURL: import.meta.env.VITE_DB_URL || "http://localhost:6789",
  timeout: 15000,
});

export const cloudinaryConfig = {
  cloudName: "dx5wheahz",
  uploadPreset: "mlusmkhs",
};
