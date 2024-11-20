import axios from "axios";

export const APIs = axios.create({
  baseURL: "http://localhost:6789",
  timeout: 3000,
});

export const cloudinaryConfig = {
  cloudName: "dx5wheahz",
  uploadPreset: "mlusmkhs",
};
