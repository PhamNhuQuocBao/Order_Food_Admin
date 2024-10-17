import axios from "axios";

export const APIs = axios.create({
  baseURL: "http://localhost:6789",
});
