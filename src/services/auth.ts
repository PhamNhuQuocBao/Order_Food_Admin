import { ENDPOINT } from "../constants/endpoint";
import { UserRequest } from "../types";
import { APIs } from "./index.api";

export const login = async (data: UserRequest) => {
  try {
    const res = await APIs.post(ENDPOINT.AUTH.LOGIN, data);

    return res;
  } catch (error) {
    console.error(error);
  }
};
