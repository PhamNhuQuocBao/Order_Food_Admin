import { ENDPOINT } from "../constants/endpoint";
import { MenuRequest } from "../types";
import { APIs } from "./index.api";

export const getMenus = async () => {
  try {
    const res = await APIs.get(ENDPOINT.MENU.BASE);

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMenuById = async (id: string) => {
  try {
    const res = await APIs.get(`${ENDPOINT.MENU.BASE}/${id}`);

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMenuByRestaurantId = async (id: string) => {
  try {
    const res = await APIs.get(`${ENDPOINT.MENU.OWNER}/${id}`);

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createMenu = async (data: MenuRequest) => {
  try {
    const res = await APIs.post(ENDPOINT.MENU.BASE, data);

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateMenu = async (id: string, data: MenuRequest) => {
  try {
    const res = await APIs.put(`${ENDPOINT.MENU.BASE}/${id}`, data);

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteMenu = async (id: string) => {
  try {
    const res = await APIs.delete(`${ENDPOINT.MENU.BASE}/${id}`);

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
